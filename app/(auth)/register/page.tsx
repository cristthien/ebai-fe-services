"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; //
import { useForm } from "react-hook-form";
import { useState } from "react"; // Import useState

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Giả sử bạn đang dùng shadcnui

import {
  RegisterFormBody,
  RegisterFormBodyType,
} from "@/schemaValidations/auth.schema";
import authApiRequest from "@/apiRequest/auth";

export default function RegisterPage() {
  const [dialogOpen, setDialogOpen] = useState(false); // Quản lý trạng thái mở/đóng Dialog
  const [registerStatus, SetRegisterStatus] = useState("");
  const form = useForm<RegisterFormBodyType>({
    resolver: zodResolver(RegisterFormBody),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      reenterPassword: "",
    },
  });

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: RegisterFormBodyType) {
    const response = await authApiRequest.register(values);
    if (response.statusCode == 200) {
      SetRegisterStatus("You check your email");
    } else {
      SetRegisterStatus(response.message);
    }
    setDialogOpen(true);
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100 "
      style={{
        backgroundImage: "url(./background.jpg)",
        backgroundSize: "cover", // Ensures the image covers the entire div
        backgroundPosition: "center", // Centers the image in the div
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full mx-3 max-w-md px-6 py-10 bg-white rounded-[24px] shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-8 "> Register </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm rounded-[16px] py-5"
                      placeholder="Choose a username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm rounded-[16px] py-5"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-sm rounded-[16px] py-5"
                        type={showPassword ? "text" : "password"} // Toggle the type
                        placeholder="Your password"
                        {...field}
                      />
                      {/* Show/Hide Password Icon */}
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)} // Toggle the state
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 "
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reenterPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Re-enter Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="text-sm rounded-[16px] py-5"
                        type={showPassword ? "text" : "password"} // Toggle the type
                        placeholder="Re-enter your password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)} // Toggle the state
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 "
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-full py-6 bg-[#3665f3] hover:bg-[#3665f3] hover:opacity-80 font-bold "
            >
              Register
            </Button>
          </form>
        </Form>
        <div className=" flex text-sm justify-end mt-2 mr-2">
          <span className="mr-2">Available user?</span>
          <Link href="/sign-in " className="underline text-blue">
            Sign in
          </Link>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-4">
          <Button
            className="w-full flex items-center justify-center gap-2 py-6 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
            onClick={() => console.log("Google Sign-Up")}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            Sign up with Google
          </Button>
          <Button
            className="w-full flex items-center justify-center gap-2 py-6 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full"
            onClick={() => console.log("GitHub Sign-Up")}
          >
            <FontAwesomeIcon icon={faGithub} className="text-xl" />
            Sign up with GitHub
          </Button>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Trạng Thái đăng ký</DialogTitle>
              <DialogDescription>{registerStatus}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
