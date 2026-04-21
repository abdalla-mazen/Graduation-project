export type SkillType = "TECHNICAL" | "SOFT"

export interface Skill {
  id: number
  name: string
  track_id: number | null
  type: SkillType
}

export interface AddProjectFormValues {
  title: string
  description: string
  github_url: string
  demo_url: string
  skills: string[]
}

export interface AddProjectProps {
  skills: Skill[]
}
