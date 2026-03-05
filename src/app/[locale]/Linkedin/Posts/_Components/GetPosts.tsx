import React from 'react'
import getPosts from '@/lib/apis/get-jobs-linkedin.api'
import { JobsResponse } from '@/lib/types/posts'
export default async function GetPosts() {
    const Posts:JobsResponse = await getPosts()
  return <>
  
  {Posts.count > 0 ? (
  Posts.posts.map((post , index) => (
    <div key={index} className='shadow-xl p-4 rounded-lg my-2'>
      <p className='font-bold text-xl'>
        Job Title : <span>{post.job_title}</span>
      </p>

      <p className='font-bold'>
        Company Name : <span>{post.company_name}</span>
      </p>

      <p className='font-bold'>
        Experience : <span>{post.experience_years}</span>
      </p>
      <p className='font-bold'>Job Description :  {post.job_description}</p>
      <p>required_skills</p>
      <div className='flex gap-3'>
        {post.preferred_skills.map((skill , index)=>(
        <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm' key={index}>{skill}</span>
      ))}
      </div>
    </div>
  ))
) : <p className='text-center my-3 text-3xl font-bold'>sorry : No Jobs Found</p>}
  </>
}

