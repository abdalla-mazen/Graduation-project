import React from 'react'
import CVForm from './_componennts/cvForm'
import getUniversities from '@/lib/apis/get-university.api'
import { UniversitiesResponse } from '@/lib/types/univeristy'
import { getUserSkills } from '@/lib/apis/get-skills-user.api'
import { SkillsResponse } from '@/lib/types/skills-user'
import YoutubeButton from '../_components/youtube-button'

export default async function page() {
  const University:UniversitiesResponse = await getUniversities()
  const Skill:SkillsResponse = await getUserSkills()
  return <>
  
  <YoutubeButton />
  <CVForm University = {University} Skill = {Skill} />
  </>
}
