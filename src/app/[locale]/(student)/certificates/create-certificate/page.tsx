import { getUserSkills } from '@/lib/apis/get-skills-user.api'
import { SkillsResponse } from '@/lib/types/skills-user'

import React from 'react'
import CertificateForm from './certificateForm'

export default async function Page() {
    const skills: SkillsResponse = await getUserSkills()
    
    return <CertificateForm skills={skills} /> 
}
