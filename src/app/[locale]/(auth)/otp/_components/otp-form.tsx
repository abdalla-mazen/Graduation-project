"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { verifyOtpAction } from "@/lib/actions/otp.action";
import { createOtpSchema, type OtpSchemaType } from "@/lib/schemas/otpSchema";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import OtpTimer from "./otp-timer";

  type OtpFormProps = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
};
export default function OtpForm({ email, setEmail, setTimeLeft }: OtpFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("OTP");
  const otpSchema = createOtpSchema(t);

useEffect(() => {
  const storedEmail = localStorage.getItem("reset_email");
  if (!storedEmail) {
    router.push("/en/forgot-password");
    return;
  }
  setEmail(storedEmail);

  const storedTimer = localStorage.getItem("timer");
  const remainingTime = storedTimer ? parseInt(storedTimer, 10) : 60;
  setTimeLeft(remainingTime);
}, []);

  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const verifyMutation = useMutation({
    mutationFn: async (data: { otp: string; email: string }) => {
      const result = await verifyOtpAction(data);
      if (!result.success) throw new Error(result.message);
      return result;
    },
    onSuccess: () => {
      toast({ title: "OTP verified successfully!" });
      localStorage.removeItem("timer");
      router.push("/en/reset-password");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Failed to verify OTP",
        description: error.message || "Something went wrong",
      });
    },
  });

  const onSubmit = (data: OtpSchemaType) => {
    if (!email) return;
    verifyMutation.mutate({ otp: data.otp, email });
  };

  if (!email) return null;

  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl">Enter the OTP Code</h1>

      <div className="text-sm mb-9 flex items-center gap-2 flex-wrap">
        <span>
          We have sent a 6-digit code to <span>{email}</span>
        </span>
        <button
          onClick={() => router.push("/en/forgot-password")}
          className="text-blue-700 text-sm underline"
        >
          Edit
        </button>
        <div className="relative w-full after:block after:h-[1px] after:bg-zinc-200" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col items-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    <InputOTPGroup className="gap-2">
                      {[...Array(6)].map((_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <OtpTimer email={email} />

          <Button
            type="submit"
            className="bg-red-800 text-white hover:bg-red-800 w-full"
            disabled={verifyMutation.isPending}
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
          </Button>
                  <div className="relative w-full after:block after:h-[1px] after:bg-zinc-200 after:mt-4" />

        </form>
      </Form>
    </div>
  );
}
