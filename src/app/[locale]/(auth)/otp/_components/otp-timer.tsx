"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useResendOtp } from "@/hooks/use-resend-otp";

export default function OtpTimer({ email }: { email: string }) {
  const { toast } = useToast();
  const { resend, isPending } = useResendOtp();
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const storedTimer = localStorage.getItem("timer");
    const remaining = storedTimer ? parseInt(storedTimer, 10) : 60;
    setTimeLeft(remaining);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("timer");
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        localStorage.setItem("timer", newTime.toString());
        return newTime;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    resend(email, {
      onSuccess: (res: any) => {
        toast({ title: res.message });
        setTimeLeft(60);
        localStorage.setItem("timer", "60");
      },
      onError: (err: any) => {
        toast({
          variant: "destructive",
          title: "Failed to resend OTP",
          description: err.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <div className="flex justify-end w-full">
      {timeLeft > 0 ? (
        <Button
          type="button"
          variant="link"
          disabled
          className="text-md font-medium no-underline"
        >
          Send a new code ({timeLeft} seconds)
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={handleResend}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send a new code"}
        </Button>
      )}
    </div>
  );
}
