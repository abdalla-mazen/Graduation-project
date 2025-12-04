import React from "react";
import ChooseTrackForm from "./_components/choose-track-form";
import { GetAcademicTracks } from "@/lib/apis/get-academic-tracks.api";
import {  TracksList } from "@/lib/types/academic-course";

export default async function page() {
  const data:TracksList  = await GetAcademicTracks()
  return (
 
      <div className="mt-10 p-4 max-w-[25.5rem]  datk:bg-zinc-700 ">
        <h1 className="text-5xl font-bold text-black dark:text-white  text-center mb-10 ">
          Choose Track
        </h1>
        <div className="w-full my-10">
        <ChooseTrackForm data={data } />

        </div>
      </div>

  );
}
