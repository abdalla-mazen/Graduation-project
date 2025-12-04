
import React from 'react'
import { Progress } from "@/components/ui/progress"

import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { SidebarProvider, SidebarTrigger  } from "@/components/ui/sidebar"
import Navbar from '@/components/layout/header/navbar';
import { AppSidebar } from '@/components/layout/Appsidebar';
import Slider from '@/components/shared/slider';

export default function page() {
  const value = 60
  return <>
  <Navbar/>
  <div className="contain relative mt-16">
    <div className='absolute top-0 left-0 bottom-0 z-10 rounded-lg  '>
      <SidebarProvider className='flex items-center '>
      <AppSidebar/>
      <SidebarTrigger/>
    </SidebarProvider>
    </div>
  <div className="slider">
    <Slider/>
  </div>
    <div className=" w-[90%] mx-auto my-5 ">
      <p className='font-bold text-2xl'>Hi, Welcome back</p>
      <p className='font-bold text-secondaryColor dark:text-secondaryColordark'>Are you ready to learn easier?</p>
    </div>
  <div className="down w-[90%] mx-auto flex flex-col lg:flex-row gap-10 ">
    
    <div className="left lg:w-2/3  order-2 lg:order-1">
   
      <div className="progress shadow-2xl rounded-lg  pb-2 px-5">
        <div className="info flex justify-between">
          <span className='font-bold'>AI track progress</span>
          <span>{`${value}%`}</span>
        </div>
        <Progress value={value} className='my-2' />
        <span className='dark:text-secondaryColordark'>Keep up the great work!</span>
      </div>




      <div>
        <div className="line flex justify-between items-center my-5">
        <span className='font-semibold text-2xl'>What’s New?</span>
        <span className='font-bold text-mainColor text-md'>See All</span>
        </div>



        <div className="box rounded-lg shadow-2xl flex justify-between p-5">
          <div className="left w-1/2 flex flex-col  justify-between">
            <div>
            <p className='font-bold text-xs sm:text-lg'>Product Design Entern</p>
            <span className='text-secondaryColor dark:text-secondaryColordark'>Innovate CO.</span>
            </div>
            <div className='flex gap-2 items-center'>
            <Button className='bg-mainColor py-5 px-12 dark:text-whiteColor'>Apply</Button>
            <Bookmark className='text-secondaryColor dark:text-secondaryColordark'/>
            </div>
          </div>



          <div className="right w-1/2 flex flex-col items-end">
            <div className="image w-2/3 sm:w-1/3">
              <img className='w-full mb-2' src="/images/sky.jpg" alt="sky" />
            </div >
            <div className="bg-tertiaryColor font-bold text-mainColor w-fit px-5 lg:px-10 rounded-lg py-2">Match 75%</div>
          </div>
        </div>
      </div>
    </div>
    <div className="right lg:w-1/3 order-1 lg:order-2">
     <span className='font-bold text-2xl'>Quick Actions</span>
    <div className=" flex lg:flex-wrap gap-2 text-center text-[12px] sm:text-lg text-whiteColor my-5 font-bold">
      <Link href={""} className="w-1/4 lg:w-1/3 bg-mainColor py-5 sm:py-10 rounded-lg  ">Learning plan</Link>
      <Link href={""} className="w-1/4 lg:w-1/3 bg-mainColor py-5 sm:py-10 rounded-lg">Courses</Link>
      <Link href={"/assessment/rules"} className="w-1/4 lg:w-1/3 bg-mainColor py-5 sm:py-10 rounded-lg">Assessments</Link>
      <Link href={""} className="w-1/4 lg:w-1/3 bg-mainColor py-5 sm:py-10 rounded-lg">CV Coach</Link>
     </div>
    </div>
  </div>
  </div>
  </>
}

