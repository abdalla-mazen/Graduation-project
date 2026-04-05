import React from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import CircleProgress from "@/components/ui/circleProgress";



export default function page() {
  const value = 71;
  // const valueCircle = 75;
  return (
    <div className="contain relative mt-16">

      <div className=" w-[80%] mx-auto mt-24 ">
        <p className="font-bold text-2xl">
          Welcome back, <span className="text-mainColor">Ahmed</span>
        </p>
        <p className="font-bold text-secondaryColor dark:text-secondaryColordark">
          Ready to continue your learning journey?
        </p>
      </div>
      <div className="w-[80%] mx-auto mt-10 font-bold text-xl">
        <span>Continue learning</span>
        <div className="flex flex-col md:flex-row gap-5 mt-5 ">
          <div className="flex flex-col gap-3 w-full md:w-2/3">
            <div className=" flex gap-5 p-4 shadow-lg rounded-lg">
              <div>
                <Image
                  src="/images/sql.jpg"
                  alt="sql"
                  width={140}
                  height={140}
                  className="rounded-lg"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-bold">SQL Database with Postgre</p>
                  <span className="text-secondaryColor text-sm">Udemy</span>
                  <Progress value={value} />
                  <p className="text-secondaryColor text-sm">
                    <span className="text-black">{value}</span> % I 22 / 30 lessons
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex gap-5 p-4 shadow-lg rounded-lg">
              <div>
                <Image
                  src="/images/python.jpg"
                  alt="sql"
                  width={140}
                  height={140}
                  className="rounded-lg"
                />
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-3">
                  <p className="font-bold">SQL Database with Postgre</p>
                  <span className="text-secondaryColor text-sm">Udemy</span>
                  <Progress value={value} />
                  <p className="text-secondaryColor text-sm">
                    <span className="text-black">{value}</span> % I 22 / 30 lessons
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3 shadow-lg flex flex-col justify-center items-center gap-3 rounded-lg">
            <span>Progress</span>
            <CircleProgress />
            <ul className=" text-mainColor text-sm">
              <li>
                <span>43</span> hours learned
              </li>
              <li>
                <span>2</span> courses completed
              </li>
              <li>
                <span>44</span> lessons completed
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 w-[80%] h-64 relative mx-auto">
        <Image src="/images/education.png" alt="education" fill />
      </div>

      {/* <div className="flex flex-col md:flex-row gap-10 w-[80%] mx-auto my-10 ">
        <div className="flex flex-col gap-2 w-full md:w-1/3 text-center">
          <p className="text-mainColor font-bold">Nexus</p>
          <p className="">
            Unleash your potential with our comprehensive learning platform - designed to help,
            engage, and equip everyone with the skills and knowledge needed to succeed in a
            constantly changing world.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3 text-center">
          <span className="font-bold">Courses</span>
          <ul>
            <li>UI/UX Design</li>
            <li>Data Engineer</li>
            <li>Machine Learning</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/3 text-center">
          <span className="font-bold">Support</span>
          <span>Help Center</span>
        </div>
      </div> */}


      
    </div>
  );
}
