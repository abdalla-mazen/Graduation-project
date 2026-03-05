import React from 'react'
import getJobs from '@/lib/apis/get-posts-linkedin.api'
import { LinkedInJobs } from '@/lib/types/jobs'
import Link from 'next/link'
export default async function GetPosts() {
    const Jobs:LinkedInJobs = await getJobs()
  return <>
  
  {Jobs.map((job , index)=>(
          <div key={index} className='shadow-xl p-4 rounded-lg my-2 '>
        <p className='font-bold text-xl'>Jop Title : {job.job_title}</p>
        <p>Company Name : {job.company_name}</p>
        <Link href={job.company_url}> Contact with compant : <span className='text-mainColor truncate block w-full md:inline md:w-auto md:truncate-0'>{job.company_url}</span></Link>
        <div className='flex gap-3'>
          <p className='px-2 my-2 bg-mainColor text-white rounded-lg'>{job.is_remote ? "Remote" : "On-site"}</p>  
          <p className='px-2 my-2 bg-secondaryColor text-white rounded-lg'>{index % 2 == 0 ? "Full Time" : "Part Time" }</p>
        </div>   
        </div>

      ))}
  </>
}
