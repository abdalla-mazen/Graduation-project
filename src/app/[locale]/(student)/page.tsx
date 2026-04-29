// import { authOptions } from "@/auth";
// import NexxuusChatbot from "@/components/features/nexxuus-chatbot";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent } from "@/components/ui/card";
// import { getServerSession } from "next-auth/next";
// import Link from "next/link";
// import {
//   ArrowRight,
//   CalendarDays,
//   CheckCircle2,
//   Github,
//   GraduationCap,
//   Linkedin,
//   Mail,
//   MapPinned,
//   ShieldCheck,
//   Sparkles,
//   User2,
// } from "lucide-react";

// function normalizeUrl(url?: string | null) {
//   if (!url) return null;
//   return url.startsWith("http://") || url.startsWith("https://")
//     ? url
//     : `https://${url}`;
// }

// function getRoleLabel(role?: string | null) {
//   return role === "TEACHER" ? "Teacher" : "Student";
// }

// export default async function Page() {
//   const session = await getServerSession(authOptions);
//   const user = session?.user;

//   const userName = user?.name?.trim() || user?.username || "Student";
//   const userTrack = user?.trackName || "Track not selected yet";
//   const currentSemester = user?.currentSemester
//     ? `Semester ${user.currentSemester}`
//     : "Not assigned";
//   const academicYear = user?.year ? `Year ${user.year}` : "Not assigned";

//   const githubUrl = normalizeUrl(user?.githubUrl);
//   const linkedInUrl = normalizeUrl(user?.linkedinUrl);

//   const completedItems = [
//     !!user?.trackId,
//     !!user?.currentSemester,
//     !!(githubUrl || linkedInUrl),
//   ].filter(Boolean).length;

//   const completionPercent = Math.round((completedItems / 3) * 100);

//   const nextStep = !user?.trackId
//     ? "Choose your academic track to unlock more relevant recommendations."
//     : !user?.currentSemester
//     ? "Complete your current semester details to get more accurate content."
//     : !user?.githubUrl && !user?.linkedinUrl
//     ? "Add your professional links to strengthen your profile."
//     : "Your profile looks good. Keep it updated for better guidance.";

//   const quickInfo = [
//     {
//       title: "Email",
//       value: user?.email || "Unavailable",
//       icon: Mail,
//     },
//     {
//       title: "Username",
//       value: user?.username || "Unavailable",
//       icon: User2,
//     },
//     {
//       title: "Track",
//       value: userTrack,
//       icon: GraduationCap,
//     },
//     {
//       title: "Year & Semester",
//       value: `${academicYear} · ${currentSemester}`,
//       icon: CalendarDays,
//     },
//   ];

//   const actionCards = [
//     {
//       title: "Academic path",
//       description: user?.trackId
//         ? `${userTrack} is connected to your account.`
//         : "Your academic path is not selected yet.",
//       icon: GraduationCap,
//       done: !!user?.trackId,
//     },
//     {
//       title: "Semester setup",
//       description: user?.currentSemester
//         ? `You are currently in ${currentSemester}.`
//         : "Add your current semester to personalize your experience.",
//       icon: CalendarDays,
//       done: !!user?.currentSemester,
//     },
//     {
//       title: "Professional presence",
//       description:
//         githubUrl || linkedInUrl
//           ? "At least one professional account is connected."
//           : "Connect GitHub or LinkedIn to strengthen your account.",
//       icon: MapPinned,
//       done: !!(githubUrl || linkedInUrl),
//     },
//   ];

//   const quickLinks = [
//     {
//       title: "Profile settings",
//       description: "Review and update your personal and academic details.",
//       href: "profile",
//       icon: User2,
//     },
//     {
//       title: "Learning plan",
//       description: "Check your recommended path and next learning steps.",
//       href: "learning-plan",
//       icon: GraduationCap,
//     },
//     {
//       title: "Projects",
//       description: "Manage your work and keep your portfolio up to date.",
//       href: "projects",
//       icon: CheckCircle2,
//     },
//   ];

//   const professionalLinks = [
//     {
//       label: "GitHub",
//       url: githubUrl,
//       icon: Github,
//     },
//     {
//       label: "LinkedIn",
//       url: linkedInUrl,
//       icon: Linkedin,
//     },
//   ];
// return (
//   <main className="min-h-screen bg-[#f7f8fc] pb-16 dark:bg-[#070a12]">
//     <section className="mx-auto w-[92%] max-w-6xl space-y-5 pt-24">
//       {/* Hero */}
//       <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0d1220]">
//         <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
//           <div className="p-7 md:p-8">
//             <div className="mb-5 flex flex-wrap items-center gap-2">
//               <Badge className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300">
//                 {getRoleLabel(user?.role)}
//               </Badge>

//               <Badge
//                 className={
//                   user?.isActive
//                     ? "rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300"
//                     : "rounded-full bg-amber-50 px-3 py-1 text-amber-700 hover:bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300"
//                 }
//               >
//                 {user?.isActive ? "Ready to go" : "Setup needed"}
//               </Badge>
//             </div>

//             <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">
//               Welcome back
//             </p>

//             <h1 className="mt-2 max-w-2xl text-4xl font-black tracking-tight text-slate-950 dark:text-white">
//               What do you want to build today, {userName}?
//             </h1>

//             <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
//               Jump into your learning plan, continue your projects, or finish
//               your setup to get better recommendations.
//             </p>

//             <div className="mt-7 flex flex-wrap gap-3">
//               <Link
//                 href="learning-plan"
//                 className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
//               >
//                 Continue learning
//                 <ArrowRight className="h-4 w-4" />
//               </Link>

//               <Link
//                 href="projects"
//                 className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
//               >
//                 View projects
//               </Link>
//             </div>
//           </div>

//           <div className="relative border-t border-sky-100 bg-[linear-gradient(160deg,#f4faff_0%,#eef6ff_52%,#e8f3ff_100%)] p-7 text-slate-900 dark:bg-black/30 dark:text-white md:border-l md:border-t-0 dark:border-slate-800 md:p-8">
//             <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-sky-300/25" />
//             <div className="relative flex h-full flex-col justify-between gap-8">
//               <div>
//                 <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700/80 dark:text-blue-200/80">
//                   Today focus
//                 </p>

//                 <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
//                   Keep moving forward
//                 </h2>

//                 <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
//                   Small progress every day makes your profile and projects
//                   stronger.
//                 </p>
//               </div>

//               <div className="grid gap-3">
//                 <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
//                   <p className="text-xs text-slate-500 dark:text-slate-300">Track</p>
//                   <p className="mt-1 font-bold text-slate-900 dark:text-white">{userTrack}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
//                     <p className="text-xs text-slate-500 dark:text-slate-300">Year</p>
//                     <p className="mt-1 font-bold text-slate-900 dark:text-white">{academicYear}</p>
//                   </div>

//                   <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10">
//                     <p className="text-xs text-slate-500 dark:text-slate-300">Semester</p>
//                     <p className="mt-1 font-bold text-slate-900 dark:text-white">{currentSemester}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main shortcuts */}
//       <div className="grid gap-4 md:grid-cols-3">
//         {[
//           {
//             title: "Learning plan",
//             description: "Follow your recommended path and next study steps.",
//             href: "learning-plan",
//             icon: GraduationCap,
//             className:
//               "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
//           },
//           {
//             title: "Projects",
//             description: "Continue building and improving your portfolio.",
//             href: "projects",
//             icon: CheckCircle2,
//             className:
//               "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300",
//           },
//           {
//             title: "Profile",
//             description: "Update your details for better recommendations.",
//             href: "profile",
//             icon: User2,
//             className:
//               "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300",
//           },
//         ].map((item) => {
//           const Icon = item.icon;

//           return (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="group rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-[#0d1220] dark:hover:border-blue-900"
//             >
//               <div className="mb-5 flex items-center justify-between">
//                 <div
//                   className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.className}`}
//                 >
//                   <Icon className="h-5 w-5" />
//                 </div>

//                 <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-300" />
//               </div>

//               <h2 className="text-lg font-black text-slate-950 dark:text-white">
//                 {item.title}
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
//                 {item.description}
//               </p>
//             </Link>
//           );
//         })}
//       </div>

//       {/* Bottom */}
//       <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
//         {/* Setup */}
//         <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0d1220]">
//           <div className="mb-5 flex items-center justify-between gap-3">
//             <div>
//               <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
//                 Recommended
//               </p>
//               <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
//                 Finish your setup
//               </h2>
//             </div>

//             <Badge variant="secondary" className="rounded-full">
//               {actionCards.filter((item) => item.done).length}/
//               {actionCards.length} done
//             </Badge>
//           </div>

//           <div className="space-y-3">
//             {actionCards.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <div
//                   key={item.title}
//                   className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60"
//                 >
//                   <div
//                     className={
//                       item.done
//                         ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
//                         : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 dark:bg-slate-900 dark:text-blue-300"
//                     }
//                   >
//                     {item.done ? (
//                       <CheckCircle2 className="h-5 w-5" />
//                     ) : (
//                       <Icon className="h-5 w-5" />
//                     )}
//                   </div>

//                   <div className="min-w-0 flex-1">
//                     <p className="font-bold text-slate-800 dark:text-white">
//                       {item.title}
//                     </p>
//                     <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
//                       {item.description}
//                     </p>
//                   </div>

//                   <span
//                     className={
//                       item.done
//                         ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
//                         : "rounded-full bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-500 dark:bg-slate-900"
//                     }
//                   >
//                     {item.done ? "Done" : "Todo"}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Account mini card */}
//         <div className="rounded-[30px] border border-sky-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-[0_16px_40px_rgba(14,165,233,0.08)] dark:border-slate-800 dark:bg-[#0d1220]">
//           <div className="mb-5 flex items-center gap-4">
//             <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#38bdf8_0%,#2563eb_100%)] text-xl font-black text-white shadow-sm dark:bg-white dark:text-slate-950">
//               {userName.charAt(0).toUpperCase()}
//             </div>

//             <div className="min-w-0">
//               <p className="truncate font-black text-slate-800 dark:text-white">
//                 {userName}
//               </p>
//               <p className="truncate text-sm text-slate-500 dark:text-slate-400">
//                 {user?.email || "Email unavailable"}
//               </p>
//             </div>
//           </div>

//           <div className="space-y-3">
//             {quickInfo.slice(1, 4).map((item) => {
//               const Icon = item.icon;

//               return (
//                 <div
//                   key={item.title}
//                   className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/80 p-3 dark:border-slate-800"
//                 >
//                   <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-slate-900 dark:text-slate-300">
//                     <Icon className="h-4 w-4" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-xs font-semibold text-slate-500">
//                       {item.title}
//                     </p>
//                     <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
//                       {item.value}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="mt-5 grid grid-cols-2 gap-3">
//             {[
//               { icon: Github, label: "GitHub", url: githubUrl },
//               { icon: Linkedin, label: "LinkedIn", url: linkedInUrl },
//             ].map(({ icon: Icon, label, url }) => (
//               <a
//                 key={label}
//                 href={url || "#"}
//                 target={url ? "_blank" : undefined}
//                 rel={url ? "noreferrer" : undefined}
//                   className={
//                     url
//                       ? "flex items-center justify-center gap-2 rounded-2xl bg-sky-50/80 px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-sky-100 hover:text-sky-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:bg-blue-950/20 dark:hover:text-blue-300"
//                       : "flex cursor-default items-center justify-center gap-2 rounded-2xl border border-dashed border-sky-100 bg-white/70 px-3 py-3 text-sm font-bold text-slate-400 dark:border-slate-800"
//                   }
//                 >
//                 <Icon className="h-4 w-4" />
//                 {label}
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>

//       <NexxuusChatbot />
//     </section>
//   </main>
// );
// }



import { authOptions } from "@/auth";
import NexxuusChatbot from "@/components/features/nexxuus-chatbot";
import { Badge } from "@/components/ui/badge";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPinned,
  User2,
} from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────

function normalizeUrl(url?: string | null): string | null {
  if (!url) return null;
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

function getRoleLabel(role?: string | null): string {
  return role === "TEACHER" ? "Teacher" : "Student";
}

// ─── types ───────────────────────────────────────────────────────────────────

interface ActionCard {
  title: string;
  description: string;
  icon: React.ElementType;
  done: boolean;
}

interface QuickInfoItem {
  title: string;
  value: string;
  icon: React.ElementType;
}

interface ShortcutItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: "blue" | "teal" | "violet";
}

// ─── color maps ──────────────────────────────────────────────────────────────

const shortcutColorMap: Record<
  ShortcutItem["color"],
  { bg: string; text: string }
> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    text: "text-blue-700 dark:text-blue-300",
  },
  teal: {
    bg: "bg-cyan-50 dark:bg-cyan-950/40",
    text: "text-cyan-700 dark:text-cyan-300",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-300",
  },
};

// ─── sub-components ──────────────────────────────────────────────────────────

function ProfileAvatar({
  name,
  image,
  size = "md",
}: {
  name: string;
  image?: string | null;
  size?: "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-16 w-16 text-xl" : "h-12 w-12 text-lg";

  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name}
        className={`${sizeClass} rounded-2xl object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 font-black text-white`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function SetupProgressBar({ done, total }: { done: number; total: number }) {
  const percent = Math.round((done / total) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
        {done}/{total}
      </span>
    </div>
  );
}

function ActionCardRow({ item }: { item: ActionCard }) {
  const Icon = item.icon;

  return (
    <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60">
      <div
        className={
          item.done
            ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
            : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-400"
        }
      >
        {item.done ? (
          <CheckCircle2 className="h-5 w-5" />
        ) : (
          <Icon className="h-5 w-5" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-800 dark:text-white">{item.title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {item.description}
        </p>
      </div>

      <span
        className={
          item.done
            ? "mt-0.5 shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            : "mt-0.5 shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-400 dark:border-slate-700 dark:bg-slate-900"
        }
      >
        {item.done ? "Done" : "Todo"}
      </span>
    </div>
  );
}

function QuickInfoRow({ item }: { item: QuickInfoItem }) {
  const Icon = item.icon;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-slate-800 dark:text-slate-300">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500">{item.title}</p>
        <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
          {item.value}
        </p>
      </div>
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const userName = user?.name?.trim() || user?.username || "Student";
  const userTrack = user?.trackName || "Track not selected yet";
  const currentSemester = user?.currentSemester
    ? `Semester ${user.currentSemester}`
    : "Not assigned";
  const academicYear = user?.year ? `Year ${user.year}` : "Not assigned";

  const githubUrl = normalizeUrl(user?.githubUrl);
  const linkedInUrl = normalizeUrl(user?.linkedinUrl);

  // ── data ──────────────────────────────────────────────────────────────────

  const actionCards: ActionCard[] = [
    {
      title: "Academic path",
      description: user?.trackId
        ? `${userTrack} is connected to your account.`
        : "Your academic path is not selected yet.",
      icon: GraduationCap,
      done: !!user?.trackId,
    },
    {
      title: "Semester setup",
      description: user?.currentSemester
        ? `You are currently in ${currentSemester}.`
        : "Add your current semester to personalize your experience.",
      icon: CalendarDays,
      done: !!user?.currentSemester,
    },
    {
      title: "Professional presence",
      description:
        githubUrl || linkedInUrl
          ? "At least one professional account is connected."
          : "Connect GitHub or LinkedIn to strengthen your account.",
      icon: MapPinned,
      done: !!(githubUrl || linkedInUrl),
    },
  ];

  const quickInfo: QuickInfoItem[] = [
    { title: "Email", value: user?.email || "Unavailable", icon: Mail },
    {
      title: "Username",
      value: user?.username || "Unavailable",
      icon: User2,
    },
    { title: "Track", value: userTrack, icon: GraduationCap },
    {
      title: "Year & Semester",
      value: `${academicYear} · ${currentSemester}`,
      icon: CalendarDays,
    },
  ];

  const shortcuts: ShortcutItem[] = [
    {
      title: "Learning plan",
      description: "Follow your recommended path and next study steps.",
      href: "learning-plan",
      icon: GraduationCap,
      color: "blue",
    },
    {
      title: "Projects",
      description: "Continue building and improving your portfolio.",
      href: "projects",
      icon: CheckCircle2,
      color: "teal",
    },
    {
      title: "Profile",
      description: "Update your details for better recommendations.",
      href: "profile",
      icon: User2,
      color: "violet",
    },
  ];

  const professionalLinks = [
    { label: "GitHub", url: githubUrl, icon: Github },
    { label: "LinkedIn", url: linkedInUrl, icon: Linkedin },
  ];

  const doneCount = actionCards.filter((c) => c.done).length;

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <main className="min-h-screen bg-[#f7f8fc] pb-16 dark:bg-[#070a12]">
      <section className="mx-auto w-[92%] max-w-6xl space-y-5 pt-24">

        {/* ── Hero ── */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0d1220]">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">

            {/* left */}
            <div className="p-7 md:p-10">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 hover:bg-blue-50 dark:bg-blue-950/50 dark:text-blue-300">
                  {getRoleLabel(user?.role)}
                </Badge>
                <Badge
                  className={
                    user?.isActive
                      ? "rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "rounded-full bg-amber-50 px-3 py-1 text-amber-700 hover:bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300"
                  }
                >
                  {user?.isActive ? "Ready to go" : "Setup needed"}
                </Badge>
              </div>

              <p className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                Welcome back
              </p>

              <h1 className="mt-2 max-w-2xl text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                What do you want to build today,{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {userName}
                </span>
                ?
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                Jump into your learning plan, continue your projects, or finish
                your setup to get better recommendations.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="learning-plan"
                  className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Continue learning
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="projects"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900"
                >
                  View projects
                </Link>
              </div>
            </div>

            {/* right */}
            <div className="border-t border-slate-100 bg-slate-50/80 p-7 dark:border-slate-800 dark:bg-slate-900/40 md:border-l md:border-t-0 md:p-8">
              <div className="flex h-full flex-col justify-between gap-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    Today&apos;s focus
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
                    Keep moving forward
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Small progress every day makes your profile and projects
                    stronger.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Track
                    </p>
                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {userTrack}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Year
                      </p>
                      <p className="mt-1 font-bold text-slate-900 dark:text-white">
                        {academicYear}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Semester
                      </p>
                      <p className="mt-1 font-bold text-slate-900 dark:text-white">
                        {currentSemester}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Shortcuts ── */}
        <div className="grid gap-4 md:grid-cols-3">
          {shortcuts.map((item) => {
            const Icon = item.icon;
            const colors = shortcutColorMap[item.color];

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-[#0d1220] dark:hover:border-blue-900"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors.bg} ${colors.text}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-300" />
                </div>

                <h2 className="text-lg font-black text-slate-950 dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* ── Bottom ── */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Setup card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0d1220]">
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Recommended
                </p>
                <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">
                  Finish your setup
                </h2>
              </div>
            </div>

            <div className="mb-5">
              <SetupProgressBar done={doneCount} total={actionCards.length} />
            </div>

            <div className="space-y-3">
              {actionCards.map((item) => (
                <ActionCardRow key={item.title} item={item} />
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0d1220]">
            <div className="mb-5 flex items-center gap-4">
              <ProfileAvatar name={userName} image={user?.image} />

              <div className="min-w-0">
                <p className="truncate font-black text-slate-800 dark:text-white">
                  {userName}
                </p>
                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                  {user?.email || "Email unavailable"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {quickInfo.slice(1, 4).map((item) => (
                <QuickInfoRow key={item.title} item={item} />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {professionalLinks.map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url ?? "#"}
                  target={url ? "_blank" : undefined}
                  rel={url ? "noreferrer" : undefined}
                  className={
                    url
                      ? "flex items-center justify-center gap-2 rounded-2xl bg-sky-50/80 px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-sky-100 hover:text-sky-700 dark:bg-slate-950/60 dark:text-slate-200 dark:hover:bg-blue-950/20 dark:hover:text-blue-300"
                      : "flex cursor-default items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-white/70 px-3 py-3 text-sm font-bold text-slate-400 dark:border-slate-700"
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <NexxuusChatbot />
      </section>
    </main>
  );
}