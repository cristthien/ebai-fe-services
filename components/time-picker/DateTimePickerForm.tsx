"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar1Icon, Plus, Trash, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { TimePicker } from "./time-picker";
import categoryApiRequest from "@/apiRequest/category";
import { CategoryType } from "@/schemaValidations/category.schema";
import productApiRequest from "@/apiRequest/products";
import { isClient } from "@/lib/http";
import { useToast } from "@/hooks/use-toast";
interface Field {
  key: string;
  value: string;
}
const ImageUploader: React.FC = () => {
  const { toast } = useToast();
  const [fields, setFields] = useState<Field[]>([{ key: "", value: "" }]);
  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target; // Destructure name và value từ sự kiện
    const newFields = [...fields];
    newFields[index] = {
      ...newFields[index], // Copy đối tượng hiện tại
      [name]: value, // Cập nhật trường key hoặc value
    };
    setFields(newFields);
  };
  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  // Hàm xoá trường tại chỉ số index
  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };
  const [previews, setPreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApiRequest.getAll();
        if (response.statusCode === 404) {
          throw new Error("No category to create auctions");
        } else if (response.statusCode !== 200) {
          throw new Error(response.message);
        }
        const categories = response.data;
        console.log(categories);
        setCategories(categories); // Uncomment and use this if you have a state for categories
      } catch (error: any) {
        toast({
          title: "Fail to fetch categories",
          description: error.message,
        });
      }
    };

    fetchCategories();
  }, []);
  // Schema với thêm trường name
  const formSchema = z
    .object({
      name: z
        .string()
        .min(5, "Name must be at least 5 characters")
        .max(256, "Name cannot exceed 256 characters"),
      images: z
        .array(z.instanceof(File))
        .min(1, "Please upload at least one image")
        .max(10, "You can upload a maximum of 10 images"),
      start_date: z.date(),
      end_date: z.date().refine((date) => date > new Date(), {
        message: "End date must be later than the current date and time",
      }),
      start_bid: z.number().min(0, "Start bid must be higher than 0"),
      description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
      brand: z.string().min(2, "Brand must be at least 2 characters"),
      model: z.string().min(1, "Model is required"),
      condition: z.enum(["used", "new", "unbox", "like new", ""], {
        errorMap: () => ({
          message: "Invalid condition. Use: used, new, unbox, like new",
        }),
      }),
      category_id: z.number().refine((id) => {
        // Kiểm tra category_id hợp lệ (phải nằm trong danh sách categories)
        return categories?.some((cat) => cat.id === id);
      }, "Invalid category"),
    })
    .refine((data) => data.start_date < data.end_date, {
      message: "Start date must be earlier than End date",
      path: ["start_date"], // Error shown for start_date
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      images: [],
      start_date: undefined,
      end_date: undefined,
      start_bid: 0,
      description: "",
      brand: "",
      model: "",
      condition: "", // giá trị mặc định
      category_id: 0,
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const currentImages = form.getValues("images");
      const newImages = [...currentImages, ...acceptedFiles];

      // Giới hạn 10 ảnh
      if (newImages.length > 10) {
        toast({
          title: "Uploaded image limit",
          description: "You need to add at most 10 images ",
        });
        return;
      }

      // Xử lý preview
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });

      form.setValue("images", newImages);
      form.clearErrors("images");
    },
    [form]
  );

  const removeImage = (index: number) => {
    const currentImages = form.getValues("images");
    const updatedImages = currentImages.filter((_, i) => i !== index);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    form.setValue("images", updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 10,
      maxSize: 1000000,
      accept: {
        "image/png": [],
        "image/jpg": [],
        "image/jpeg": [],
        "image/webp": [],
      },
    });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Tạo một đối tượng FormData
    const fieldSpecifiction = await JSON.stringify(fields);
    const formData = new FormData();
    // Thêm các trường từ form vào FormData
    formData.append("name", values.name);
    formData.append("start_date", values.start_date.toISOString()); // Chuyển ngày thành ISO string
    formData.append("end_date", values.end_date.toISOString());
    formData.append("starting_bid", values.start_bid.toString());
    formData.append("description", values.description);
    formData.append("brand", values.brand);
    formData.append("model", values.model);
    formData.append("condition", values.condition);
    formData.append("specifications", fieldSpecifiction);
    formData.append("category_id", values.category_id.toString());
    for (const image of values.images) {
      formData.append("images", image);
    }

    try {
      await productApiRequest.createProduct(formData);
      if (isClient()) {
        window.location.href = "/myebai/bids-offers";
      }
    } catch (error: any) {
      toast({
        title: "Error creating product:",
        description: error.message,
      });
    }
  };

  return (
    <div className="container mx-auto mt-6">
      <Card className="w-full max-w-4xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Add New Auction
          </CardTitle>
          <CardDescription>
            Fill out the form to add a new auction to your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter a name (5-256 characters)"
                        className="w-full "
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Description field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter a detailed description"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Brand field */}
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter brand name"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Model field */}
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter model"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start_bid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter start price"
                        className="w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]"
                        onChange={(e) => {
                          const value = e.target.value; // Lấy giá trị từ input
                          if (value === "" || /^[0-9]*$/.test(value)) {
                            field.onChange(
                              value === "" ? "" : parseFloat(value)
                            ); // Chấp nhận chuỗi rỗng hoặc số hợp lệ
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between  flex-col md:flex-row ">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start flex-grow mb-2">
                      <FormLabel>Start Date</FormLabel>
                      {/* popover */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Calendar1Icon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                          <div className="p-3 border-t border-border">
                            <TimePicker
                              setDate={field.onChange}
                              date={field.value}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel>End Date</FormLabel>
                      {/* popover */}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <Calendar1Icon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP HH:mm:ss")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                          <div className="p-3 border-t border-border">
                            <TimePicker
                              setDate={field.onChange}
                              date={field.value}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Images field */}
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel className="text-xl font-semibold tracking-tight">
                      Upload your images
                    </FormLabel>
                    <FormControl>
                      <div
                        {...getRootProps()}
                        className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                      >
                        <Input {...getInputProps()} type="file" multiple />
                        {isDragActive ? (
                          <p>Drop the images!</p>
                        ) : (
                          <p>Click here or drag images to upload</p>
                        )}
                      </div>
                    </FormControl>
                    {/* Hiển thị preview các ảnh */}
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {previews.map((src, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col items-center"
                        >
                          <img
                            src={src}
                            alt={`Uploaded image ${index + 1}`}
                            className="h-32 w-32 rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            className="absolute top-1 right-1 flex items-center justify-center rounded-full bg-red-600 p-1 text-white shadow-md"
                            onClick={() => removeImage(index)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Hiển thị thông báo lỗi */}
                    <FormMessage>
                      {fileRejections.length !== 0 && (
                        <p className="text-destructive">
                          Each image must be less than 1MB and in PNG/JPG/JPEG
                          format.
                        </p>
                      )}
                    </FormMessage>
                  </FormItem>
                )}
              />
              {/* Condition field */}
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded">
                        <option value="">Select a category</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="unbox">Unbox</option>
                        <option value="like new">Like New</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Category field */}
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border rounded"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? null : parseInt(value, 10)
                          ); // Convert id về số, hoặc null nếu không chọn gì
                        }}
                      >
                        <option value="">Select a category</option>{" "}
                        {/* Tùy chọn mặc định */}
                        {categories?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h2 className="text-xl font-semibold mb-4">Specification</h2>
                {fields.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 mb-4 p-4 border rounded-lg shadow-sm"
                  >
                    <div className="flex-1">
                      <Input
                        name="key"
                        placeholder="Key"
                        value={field.key}
                        onChange={(e) => handleChange(index, e)}
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        name="value"
                        placeholder="Value"
                        value={field.value}
                        onChange={(e) => handleChange(index, e)}
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => removeField(index)}
                      className="ml-2 bg-transparent text-red-500 hover:bg-red-200 p-2 rounded-full"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ))}

                {/* Nút thêm trường với biểu tượng dấu cộng */}
                <Button
                  type="button"
                  onClick={addField}
                  className="flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-full shadow-md"
                >
                  <Plus size={20} className="mr-2" />
                  Thêm Trường
                </Button>
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="mx-auto block h-auto rounded-lg px-8 py-3 text-xl"
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageUploader;
