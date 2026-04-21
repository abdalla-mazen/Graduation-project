import React from 'react'
import StudentPathForm from './_componnents/form'
import getUniversities from '@/lib/apis/get-university.api'
import { UniversitiesResponse } from '@/lib/types/univeristy'
import getfaculties from '@/lib/apis/get-faculties.api'
import { FacultiesResponse } from '@/lib/types/faculties'
import getDepartment from '@/lib/apis/get-department.api'
import { DepartmentsResponse } from '@/lib/types/department'
import getSemester from '@/lib/apis/get-semester.api'
import { YearSemestersResponse } from '@/lib/types/semester'
import getTracks from '@/lib/apis/get-track.api'
import { Tracks } from '@/lib/types/tracks'

export default async function page() {
    const University:UniversitiesResponse = await getUniversities()
    const Faculties : FacultiesResponse= await getfaculties()
    const Department:DepartmentsResponse = await getDepartment()
    const Semester:YearSemestersResponse = await getSemester()
    const Track:Tracks =await getTracks()
  return <>
  
  <StudentPathForm University = {University}  Faculties = {Faculties} Department = {Department} Semester = {Semester} Track = {Track} />
  </>
}
