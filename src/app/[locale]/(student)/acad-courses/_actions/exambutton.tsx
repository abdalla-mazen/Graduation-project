"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Exambutton() {
    const router = useRouter()
    function goToExams() {
        router.push("/exam/exam-information")
    }
  return <>
  
  <Button onClick={()=>goToExams()} className='bg-mainColor'>Go To Exams</Button>
  </>
}
