import Navbar from '@/components/layout/header/navbar'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import React, { Suspense } from 'react'
import getPosts from '@/lib/apis/get-jobs-linkedin.api'
import { JobsResponse } from '@/lib/types/posts'
import { JobsSkeleton } from '../Jobs/_Components/Skeleton'
import GetPosts from './_Components/GetPosts'
export default async function Jobs() {
  const Posts:JobsResponse = await getPosts()

  return <>
  <Navbar/>

  <div className='w-3/4 mx-auto mt-24'>
      <div className='shadow-lg rounded-lg p-5'>
       <h1 className='text-3xl font-bold my-2'>LinkedIn jobs</h1>
        <p className='text-xl font-bold'>Connect your LinkedIn</p>
        <div className='flex flex-col gap-3 sm:flex-row items-center sm:justify-between '>
          <p className='text-center my-2'>See personalized job recommendations based on your profile and skills.</p>
          <Button className='w-fit bg-mainColor'><span> <Linkedin /></span>Connect</Button>
        </div>
       
       <Suspense fallback = { <JobsSkeleton/>}>
       <GetPosts/>
       </Suspense>
       
      </div>
      </div>
  </>
}



