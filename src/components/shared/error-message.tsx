import { XCircle } from "lucide-react";
import { FormMessage } from "../ui/form";

export default function ErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  if (!message) return null;

  return (
    <FormMessage className="relative bg-red-50 py-2 border border-red-600 w-full font-normal text-sm text-center">
      <div className="-top-2 left-1/2 absolute bg-white -translate-x-1/2 transform">
        <XCircle className="w-4 h-4" />
      </div>
      {message}
    </FormMessage>
  );
}
