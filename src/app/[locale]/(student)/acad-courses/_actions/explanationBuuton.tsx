"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import React from 'react'
interface ExplanationProps {
  courseId: number
}
export default function Explanation({courseId}:ExplanationProps) {
  const router = useRouter()
  function gotoResoures() {
    router.push(`/acad-courses/${courseId}`)
  }
  return <>
  <Button onClick={()=>gotoResoures()} className=' bg-mainColor '>Explanation In Arabic</Button>
  </>
}
