"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export type Props = {
  examId: number;
  status: string;
};

export default function Exambutton({ examId, status }: Props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/exam/exam-information/${examId} `);
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-5 w-full rounded-xl bg-mainColor text-white py-2.5 text-sm font-medium"
      disabled = {status == "submitted"}
    >
      {status === "not_started"
        ? "Go To Exam"
        : status === "graded"
          ? "Go To Result"
          : status === "submitted"
            ? "Wait until teacher grades"
            : ""}
    </Button>
  );
}
