import { getCertificates } from '@/lib/apis/get-certificates.api'
import { getSkills } from '@/lib/apis/get-skills.api'
import { CertificatesResponse } from '@/lib/types/certificate-user'
import { SkillsResponse } from '@/lib/types/skills-user'
import { DM_Sans } from 'next/font/google'
import Link from 'next/link'

const dmSans = DM_Sans({ subsets: ['latin'] })
export const dynamic = "force-dynamic"

export default async function Page() {
  const payload: CertificatesResponse = await getCertificates()
  const skills: SkillsResponse = await getSkills()

  const technicalSkills = skills.filter((s) => s.type === "TECHNICAL")

  const skillMap = new Map(
    technicalSkills.map((s) => [s.id, s.name])
  )

  const hasData = payload.length > 0

  return (
    <div className={`min-h-screen p-6 ${dmSans.className}`}>
      <div className="w-full sm:w-3/4 mx-auto">

        {/* HEADER */}
        {hasData && (
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">
                Certificates
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Track your achievements & skills
              </p>
            </div>

            {/* ADD BUTTON (when data exists) */}
            <Link href={"/certificates/create-certificate"}>
            <button className="px-2 sm:px-4 py-2 rounded-lg bg-mainColor text-white text-sm">
              Add Certificate
            </button>
            </Link>
          </div>
        )}

        {/* GRID */}
        {hasData && (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {payload.map((cert) => {
              const skillName = skillMap.get(cert.skill_id)

              return (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="space-y-3">

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                        Skill
                      </p>
                      <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 text-indigo-600">
                        {skillName || "Unknown"}
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                        Certificate
                      </p>
                      <h2 className="text-base font-semibold text-gray-900">
                        {cert.title}
                      </h2>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                        Provider
                      </p>
                      <p className="text-sm text-gray-700">
                        {cert.provider}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">
                        Issued
                      </p>
                      <p className="text-sm text-gray-700">
                        {new Date(cert.issued_at).toLocaleDateString()}
                      </p>
                    </div>

                  </div>

                  <a
                    href={cert.credential_url}
                    target="_blank"
                    className="mt-6 text-sm font-medium text-white bg-mainColor px-4 py-2 rounded-lg  text-center"
                  >
                    View Credential
                  </a>
                </div>
                
              )
            })}
          </div>
        )}
       

        {/* EMPTY STATE */}
        {!hasData && (
          <div className="flex flex-col items-center justify-center text-center mt-24">

            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <svg
                className="w-7 h-7 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              </svg>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No certificates yet
            </h3>

            <p className="text-sm text-gray-500 mb-6 max-w-sm">
              Start adding your certificates to showcase your skills and achievements.
            </p>

            {/* ADD BUTTON (empty state position) */}
           <Link href={"/certificates/create-certificate"}>
            <button className="px-5 py-2 rounded-lg bg-mainColor text-white text-sm font-medium">
               Add Certificate
            </button>
           </Link>
          </div>
        )}

      </div>
    </div>
  )
}