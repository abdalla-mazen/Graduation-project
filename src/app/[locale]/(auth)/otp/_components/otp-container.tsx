"use client";

import Image from "next/image";
import OtpForm from "./otp-form";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function OtpContainer() {
  const t = useTranslations("OTP");
  const [email, setEmail] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);

  return (
    <div className="flex justify-center items-center bg-background px-4 min-h-screen text-foreground">
      <div className="flex flex-col justify-between items-center gap-10 p-6 w-[406px] min-h-[526px]">
        <Image src="/images/auth-top.png" alt="OTP Illustration" width={280} height={45} />
        <OtpForm email={email} setEmail={setEmail} timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
        <div className="text-sm font-medium text-center">
          {t("OTP.help")}{" "}
          <Link href="/contact" className="text-red-800 no-underline">
            {t("OTP.contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
