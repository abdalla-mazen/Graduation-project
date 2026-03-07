import {
  BookOpen,
  Cpu,
  Brain,
  LifeBuoy,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Zap,
  Users,
  Mail,
  Lock,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const courses = [
  { name: "UI/UX Design", icon: <BookOpen className="w-3.5 h-3.5" />, badge: "Popular" },
  { name: "Data Engineer", icon: <Cpu className="w-3.5 h-3.5" />, badge: "New" },
  { name: "Machine Learning", icon: <Brain className="w-3.5 h-3.5" />, badge: null },
  { name: "Cloud Computing", icon: <Zap className="w-3.5 h-3.5" />, badge: null },
];

const company = ["About Us", "Careers", "Blog", "Press Kit"];
const support = ["Help Center", "Community", "Contact Us", "Privacy Policy"];

const socials = [
  { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
  { icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
  { icon: <Github className="w-4 h-4" />, label: "GitHub" },
  { icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 text-slate-700 overflow-hidden border-t mt-5 border-slate-200">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-blue-100/60 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[200px] bg-blue-50/80 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-0">
        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg  flex items-center justify-center shrink-0">
                <Image src="/images/circle-logo.png" alt="Logo" width={50} height={50} />
              </div>
              <span className="text-blue-600 font-bold text-xl tracking-tight ">Nexus</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Unleash your potential with our comprehensive learning platform — designed to equip
              everyone for a constantly changing world.
            </p>
            <div className="flex gap-2 flex-wrap">
              {socials.map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
              Courses
            </p>
            <ul className="flex flex-col gap-2.5">
              {courses.map((c) => (
                <li key={c.name}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors duration-150 group"
                  >
                    <span className="text-slate-500 group-hover:text-blue-500 transition-colors">
                      {c.icon}
                    </span>
                    <span className="flex-1">{c.name}</span>
                    {c.badge && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 h-4 bg-blue-50 text-blue-600 border border-blue-100"
                      >
                        {c.badge}
                      </Badge>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
              Company
            </p>
            <ul className="flex flex-col gap-2.5">
              {company.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-700 hover:text-blue-600 transition-colors duration-150"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-widest">
              Support
            </p>
            <ul className="flex flex-col gap-2.5">
              {support.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="flex items-center gap-1.5 text-sm text-slate-700 hover:text-blue-600 transition-colors duration-150 group"
                  >
                    {item === "Help Center" && (
                      <LifeBuoy className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    )}
                    {item === "Community" && (
                      <Users className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    )}
                    {item === "Contact Us" && (
                      <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    )}
                    {item === "Privacy Policy" && (
                      <Lock className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-500 transition-colors" />
                    )}
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-200" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 sm:py-5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            All systems operational
          </div>
          <span className="text-center">
            © {new Date().getFullYear()} <span className="font-semibold text-blue-700 capitalize">Nexus</span>. All rights reserved.
          </span>
          <div className="flex gap-4">
            {["Terms", "Privacy", "Cookies"].map((t) => (
              <a key={t} href="#" className="hover:text-blue-600 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
