import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Email icon
import authApiRequest from "@/apiRequest/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // State to store loading, status message, and response data

  const { email = "you@gmail.com", code = "" } = await searchParams;
  let message = "";
  try {
    // Call API to validate email
    const response = await authApiRequest.validateEmail({ email, code });
    message = response.message ? response.message : response.data.message;
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  // Once loading is done, render the status and user data
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center mb-4">Verify Email</h1>

        {/* Email Icon */}
        <div className="flex justify-center mb-6">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-2xl text-gray-300 h-[250px] w-[250px]"
            size="2x"
          />
        </div>
        <h2 className="text-xl font-semibold text-center mb-2">{message}</h2>
        {/* Email info */}
        <div className="text-center text-sm text-gray-600">
          <p>
            Verification status for: <strong>{email}</strong>
          </p>
        </div>
        <Button
          asChild
          className="text-xl font-semibold bg-[#3665f3] hover:bg-[#3665f3] py-6 rounded-full hover:opacity-90 w-full mt-3"
        >
          <Link href="/sign-in">Go to Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
