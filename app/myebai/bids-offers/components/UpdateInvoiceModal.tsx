"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UpdateInvoiceFormProps {
  invoiceId: number;
  invoicePhoneNumber: string | null;
  invoiceAddress: string | null;
}
import invoiceApiRequest from "@/apiRequest/invoice";

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long." })
    .max(11, { message: "Phone number must not exceed 11 digits." })
    .regex(/^[0-9]+$/, { message: "Phone number can only contain numbers." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long." })
    .max(100, { message: "Address must not exceed 100 characters." }),
});

const UpdateInvoiceForm: React.FC<UpdateInvoiceFormProps> = ({
  invoiceId,
  invoicePhoneNumber,
  invoiceAddress,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: invoicePhoneNumber ? invoicePhoneNumber : "",
      address: invoiceAddress ? invoiceAddress : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      phoneNumber: values.phoneNumber,
      address: values.address,
    };

    try {
      await invoiceApiRequest.updateInvoice(invoiceId, body);
      window.location.reload();
    } catch (e: any) {
      console.error("Error updating invoice:", e.message || e);
    }
  }
  function handleError(errors: any) {
    console.log("Validation Errors:", errors);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#3655f3] hover:bg-[#3655f3] hover:opacity-90 font-semibold float-right px-4 py-5 rounded-full">
          Edit Address
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
          <DialogDescription>
            Make changes to your addres here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="bg-[#3665f3] hover:bg-[#3665f3] hover:opacity-90 px-10 py-6 font-semibold text-base rounded-full"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateInvoiceForm;
