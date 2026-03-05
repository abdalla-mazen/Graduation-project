import Navbar from '@/components/layout/header/navbar'
import { Button } from '@/components/ui/button'
import { Linkedin } from 'lucide-react'
import { JobsSkeleton } from './_Components/Skeleton'
import { Suspense } from 'react'
import GetJobs from './_Components/GetJobs'

export default async function LinkedinPosts() {
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
      </div>
      <Suspense fallback = {<JobsSkeleton/>}>
      <GetJobs/>
      </Suspense>
      
  </div>
  </>
}
