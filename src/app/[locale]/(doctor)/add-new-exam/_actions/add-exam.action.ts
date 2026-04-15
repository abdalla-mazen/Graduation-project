"use server"

import { AddExamValues } from "@/lib/schemas/add-exam.schema";
import getToken from "@/lib/utils/get-token";

export async function addNewExamAction(data :AddExamValues){
    const token = await getToken();
    const response =await fetch(`${process.env.API}/academic-exams/create`,{
        method:"POST",
        body:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken}`,
          },
    })
    const payload = await response.json();
    return payload
}