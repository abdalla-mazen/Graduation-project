"use client"
import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
export default function CircleProgress() {
     const valueCircle = 75 
  return <>
  <div className='w-1/3 md:w-1/2 relative'>
        <CircularProgressbar
                value={valueCircle}
                styles={buildStyles({
                  textSize: "18px",
                  pathColor: "#3b82f6",
                  trailColor: "#e5e7eb",
                  textColor: "#3b82f6",})}/>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-blue-600">{valueCircle}%</div>
      </div>
  
  </>
}
