import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Lock,
  Target,
} from "lucide-react"
import learningPlanAction from "./_actions/learning-plan.action"

type Course = {
  free_link: string | null
  id: number
  level: string
  paid_link: string | null
  title: string
  type: string
  url: string
  weight: number
}

type RoadmapWeek = {
  courses: Course[]
  hours: number
  kpis: string[]
  phase: string
  skills: string[]
  week: number
}

type RoadmapResponse = {
  ok: boolean
  roadmap: RoadmapWeek[]
  track_id: number
}

function getCourseLink(course: Course) {
  return course.url || course.free_link || course.paid_link || "#"
}

function formatSkill(skill: string) {
  return skill
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getWeekStatus(index: number, totalWeeks: number) {
  if (index === 0) {
    return {
      label: "Current",
      className: "border-blue-200 bg-blue-50 text-blue-700",
    }
  }

  if (index < 3) {
    return {
      label: "Upcoming",
      className: "border-amber-200 bg-amber-50 text-amber-700",
    }
  }

  if (index === totalWeeks - 1) {
    return {
      label: "Final Stage",
      className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    }
  }

  return {
    label: "Planned",
    className: "border-slate-200 bg-slate-50 text-slate-600",
  }
}

function getPhaseStyle(phase: string) {
  const value = phase.toLowerCase()

  if (value.includes("foundation")) {
    return {
      dot: "bg-blue-500",
      soft: "bg-blue-50 border-blue-100",
      text: "text-blue-700",
    }
  }

  if (value.includes("tool")) {
    return {
      dot: "bg-violet-500",
      soft: "bg-violet-50 border-violet-100",
      text: "text-violet-700",
    }
  }

  if (value.includes("ml")) {
    return {
      dot: "bg-amber-500",
      soft: "bg-amber-50 border-amber-100",
      text: "text-amber-700",
    }
  }

  if (value.includes("deep")) {
    return {
      dot: "bg-emerald-500",
      soft: "bg-emerald-50 border-emerald-100",
      text: "text-emerald-700",
    }
  }

  return {
    dot: "bg-slate-500",
    soft: "bg-slate-50 border-slate-100",
    text: "text-slate-700",
  }
}

function getCourseButton(index: number, weekIndex: number, hasLink: boolean) {
  if (!hasLink) {
    return {
      label: "Locked",
      icon: <Lock className="h-3.5 w-3.5" />,
      className: "bg-slate-100 text-slate-500 hover:bg-slate-100",
      disabled: true,
    }
  }

  if (weekIndex === 0 && index === 0) {
    return {
      label: "Start now",
      icon: <ChevronRight className="h-3.5 w-3.5" />,
      className: "bg-blue-600 text-white hover:bg-blue-700",
      disabled: false,
    }
  }

  return {
    label: "Review",
    icon: <ChevronRight className="h-3.5 w-3.5" />,
    className: "bg-blue-600 text-white hover:bg-blue-700",
    disabled: false,
  }
}

export default async function Page() {
  const data: RoadmapResponse = await learningPlanAction()

  if (!data?.ok) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <Card className="border-red-200 shadow-sm">
          <CardContent className="py-10 text-center text-sm text-slate-500">
            Failed to load learning plan.
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalWeeks = data.roadmap.length
  const totalHours = data.roadmap.reduce((sum, week) => sum + week.hours, 0)
  const totalCourses = data.roadmap.reduce(
    (sum, week) => sum + week.courses.length,
    0
  )
  const totalSkills = new Set(data.roadmap.flatMap((week) => week.skills)).size

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            My learning plan
          </h1>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Complete your plan week by week and finish all courses
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">{totalWeeks}</p>
                <p className="text-xs text-slate-500">Weeks</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">{totalHours}</p>
                <p className="text-xs text-slate-500">Total hours</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">{totalCourses}</p>
                <p className="text-xs text-slate-500">Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">{totalSkills}</p>
                <p className="text-xs text-slate-500">Skills</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Learning Plan</h2>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="week-1"
          className="space-y-4"
        >
          {data.roadmap.map((item, weekIndex) => {
            const status = getWeekStatus(weekIndex, data.roadmap.length)
            const phaseStyle = getPhaseStyle(item.phase)

            return (
              <AccordionItem
                key={item.week}
                value={`week-${item.week}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <AccordionTrigger className="px-4 py-4 hover:no-underline md:px-5">
                  <div className="flex w-full flex-col gap-4 text-left md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${phaseStyle.soft} ${phaseStyle.text}`}
                        >
                          <span className={`h-2 w-2 rounded-full ${phaseStyle.dot}`} />
                          {item.phase}
                        </span>

                        <Badge
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${status.className} hover:bg-blue-50 hover:text-blue-600`}
                        >
                          {status.label}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold text-slate-900">
                        Week {item.week}: {item.phase}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                        <span>{item.courses.length} courses</span>
                        <span className="text-slate-300">•</span>
                        <span>{item.hours} hours</span>
                        <span className="text-slate-300">•</span>
                        <span>{item.skills.length} skills</span>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-center">
                        <p className="text-lg font-semibold text-slate-900">{item.hours}</p>
                        <p className="text-xs text-slate-500">hrs</p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="border-t border-slate-100 px-4 pb-4 pt-4 md:px-5 md:pb-5">
                  <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-3">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-900">
                          Courses this week
                        </h4>
                        <span className="text-xs text-slate-400">
                          {item.courses.length} items
                        </span>
                      </div>

                      {item.courses.length > 0 ? (
                        <div className="space-y-2">
                          {item.courses.map((course, courseIndex) => {
                            const hasLink = Boolean(getCourseLink(course) !== "#")
                            const action = getCourseButton(
                              courseIndex,
                              weekIndex,
                              hasLink
                            )

                            return (
                              <div
                                key={course.id}
                                className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                              >
                                <div className="min-w-0">
                                  <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium uppercase text-slate-600">
                                      {course.level}
                                    </span>
                                    <span className="rounded-md bg-blue-100 px-2 py-1 text-[11px] font-medium uppercase text-slate-600">
                                      {course.type}
                                    </span>
                                  </div>

                                  <p className="line-clamp-2 text-sm font-medium text-slate-800">
                                    {course.title}
                                  </p>

                                  <p className="mt-1 text-xs text-slate-500">
                                    Weight: {course.weight}
                                  </p>
                                </div>

                                <div className="shrink-0">
                                  {action.disabled ? (
                                    <div
                                      className={`inline-flex h-9 items-center gap-1 rounded-lg px-3 text-xs font-medium ${action.className}`}
                                    >
                                      {action.icon}
                                      {action.label}
                                    </div>
                                  ) : (
                                    <Button
                                      asChild
                                      size="sm"
                                      className={`h-9  rounded-lg px-3 text-xs font-medium ${action.className} `}
                                    >
                                      <Link
                                        href={getCourseLink(course)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5"
                                      >
                                        {action.label}
                                        {action.icon}
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                          No courses added for this week yet.
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h4 className="mb-3 text-sm font-semibold text-slate-900">
                          Skills to practice
                        </h4>

                        {item.skills.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                              >
                                {formatSkill(skill)}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">No skills listed.</p>
                        )}
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-4">
                        <h4 className="mb-3 text-sm font-semibold text-slate-900">
                          Weekly KPIs
                        </h4>

                        {item.kpis.length > 0 ? (
                          <div className="space-y-2">
                            {item.kpis.map((kpi, index) => (
                              <div
                                key={`${item.week}-${index}`}
                                className="flex items-start gap-3 rounded-xl bg-slate-50 px-3 py-3"
                              >
                                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
                                  {index + 1}
                                </span>
                                <p className="text-sm leading-6 text-slate-600">
                                  {kpi}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">No KPI targets yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}