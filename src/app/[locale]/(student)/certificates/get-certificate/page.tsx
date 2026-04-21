

import { getCertificates } from '@/lib/apis/get-certificates.api'
import { CertificatesResponse, Certificate } from '@/lib/types/certificate-user'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'

const dmSans = DM_Sans({ subsets: ['latin'] })
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ['latin'] })

const SKILL_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  default: { bg: '#EEEDFE', text: '#3C3489', icon: '#7F77DD' },
  react:   { bg: '#EEEDFE', text: '#3C3489', icon: '#7F77DD' },
  node:    { bg: '#E1F5EE', text: '#085041', icon: '#1D9E75' },
  design:  { bg: '#FAEEDA', text: '#633806', icon: '#BA7517' },
  ts:      { bg: '#FAECE7', text: '#4A1B0C', icon: '#D85A30' },
}

function getSkillColors(skillName?: string) {
  const key = skillName?.toLowerCase().split(/[\s.]/)[0] ?? 'default'
  return SKILL_COLORS[key] ?? SKILL_COLORS.default
}

export default async function Page() {
  const payload: CertificatesResponse = await getCertificates()
  const thisYear = new Date().getFullYear()
  const thisYearCount = payload?.filter(c =>
    new Date(c.issued_at).getFullYear() === thisYear
  ).length ?? 0
  const uniqueSkills = new Set(payload?.map(c => c.skill?.name).filter(Boolean)).size

  return (
    <div className={`min-h-screen bg-white p-6 flex justify-center w-full sm:w-3/4 mx-auto ${dmSans.className}`}>
      <div className="w-full">

        {/* Header */}
        <p className="text-xs font-medium tracking-widest uppercase text-gray-400 mb-1">
          Portfolio
        </p>
        <h1 className={`text-4xl text-gray-900 mb-8 leading-tight ${dmSerif.className}`}>
          My Certificates
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-7">
          {[
            { label: 'Total',     value: payload?.length ?? 0 },
            { label: 'This year', value: thisYearCount },
            { label: 'Skills',    value: uniqueSkills },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className="text-2xl font-medium text-gray-900">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {payload?.map((cert: Certificate) => {
            const colors = getSkillColors(cert.skill?.name)
            return (
              <div
                key={cert.id}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 hover:border-gray-200 transition-colors duration-150"
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: colors.bg }}
                >
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none">
                    <path
                      d="M10 2L12.4 7.2L18 8.1L14 12L15 17.6L10 15L5 17.6L6 12L2 8.1L7.6 7.2L10 2Z"
                      fill={colors.icon}
                    />
                  </svg>
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    {cert.title}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {cert.skill?.name && (
                      <span
                        className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                        style={{ background: colors.bg, color: colors.text }}
                      >
                        {cert.skill.name}
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(cert.issued_at).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <svg className="w-4 h-4 text-gray-300 shrink-0" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )
          })}
        </div>

        {/* Empty state */}
        {payload?.length === 0 && (
          <div className="text-center text-gray-400 mt-16 text-sm">
            No certificates yet
          </div>
        )}
      </div>
    </div>
  )
}