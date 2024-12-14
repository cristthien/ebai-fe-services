/* eslint-disable */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import categoryApiRequest from "@/apiRequest/category";

const Page: React.FC = () => {
  const { toast } = useToast();
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");

  const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    image: z
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: {
        "image/png": [],
        "image/jpg": [],
        "image/jpeg": [],
        "image/webp": [],
      },
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("thumbnail", values.image);

    try {
      const response = await categoryApiRequest.create(formData);
      toast({
        title: "Fail to add new categories",
        description: response.message,
      });
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Fail to add new categories",
        description: error.message,
      });
    }
  };

  return (
    <ContentLayout title="Create a new category">
      <div className="max-w-[700px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...form.register("name")} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...form.register("description")} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            {/* Image Upload Field */}
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel
                    className={`${
                      fileRejections.length !== 0 && "text-destructive"
                    }`}
                  >
                    <h2 className="text-xl font-semibold tracking-tight">
                      Upload your image
                      <span
                        className={
                          form.formState.errors.image ||
                          fileRejections.length !== 0
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }
                      ></span>
                    </h2>
                  </FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
                    >
                      {preview && (
                        <img
                          src={preview as string}
                          alt="Uploaded image"
                          className="max-h-[400px] rounded-lg"
                        />
                      )}
                      <ImagePlus
                        className={`size-40 ${preview ? "hidden" : "block"}`}
                      />
                      <Input {...getInputProps()} type="file" />
                      {isDragActive ? (
                        <p>Drop the image!</p>
                      ) : (
                        <p>Click here or drag an image to upload it</p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage>
                    {fileRejections.length !== 0 && (
                      <p>
                        Image must be less than 1MB and of type png, jpg, or
                        jpeg
                      </p>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className=" block h-auto rounded-lg px-8 py-2 text-base font-semibold"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </ContentLayout>
  );
};

export default Page;
