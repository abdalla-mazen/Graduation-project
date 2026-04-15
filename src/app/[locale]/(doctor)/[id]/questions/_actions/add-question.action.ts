"use server"

import { AddQuestionSchema } from "@/lib/schemas/add-question.schema";
import getToken from "@/lib/utils/get-token";

export async function addQuestionAction({data , exam_id}:{data : AddQuestionSchema , exam_id : number}){ 
    const token = await getToken(); 
    const response =await fetch(`${process.env.API}/academic-exams/${exam_id}/add-question`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.accessToken}`,
          },
        body:JSON.stringify(data)
    })
    const payload = await response.json();
    return payload
}