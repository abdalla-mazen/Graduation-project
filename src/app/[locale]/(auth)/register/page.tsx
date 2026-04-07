import React from "react";
import RegisterForm from "./_components/register-form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { University } from "@/lib/types/univeristy";
import getUniversities from "@/lib/apis/get-university.api";
import getTracks from "@/lib/apis/get-track.api";
import { Track } from "@/lib/types/tracks";


export default async function Page() {

  const payload:University[] = await getUniversities()
  const data:Track[] = await getTracks()

  return (
    <main className="">
      {/* Register title */}

      <h1 className="text-5xl font-bold text-black dark:text-white text-center mb-10 ">
        register
      </h1>

      {/* Register form (client component) */}
      <RegisterForm payload = {payload}  data = {data}  />

      {/* Register meassage , login link */}
      <Link href={"/login"} className="text-blue-600 font-bold mt-2 block text-center">
        Alerdy Have Account?  
        <span className="text-blue-600 font-bold ms-2">Go to Login Now</span>{" "}
      </Link>
    </main>
  );
}
