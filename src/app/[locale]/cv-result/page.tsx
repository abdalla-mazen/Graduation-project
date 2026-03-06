
// "use client";
// import {
//   AlertTriangle,
//   Upload,
//   TrendingUp,
//   Flame,
//   AlertCircle,
//   FileText,
//   CheckCircle2,
// } from "lucide-react";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { useQuery } from "@tanstack/react-query";
// import { CvAnalysisResponse } from "@/lib/types/cv-analysis";

// const scoreData = [
//   { label: "Formatting", score: 78, color: "bg-green-400" },
//   { label: "Content", score: 58, color: "bg-yellow-400" },
//   { label: "Keywords", score: 92, color: "bg-green-500" },
//   { label: "Structure", score: 88, color: "bg-blue-500" },
// ];

// const criticalIssues = [
//   "Future dates (e.g., June 2025).",
//   "Spelling & Spacing errors.",
//   "Missing GitHub & LinkedIn links.",
// ];

// const missingSections = ["Certifications", "Awards / Honors", "GitHub & LinkedIn links"];

// const whatToFix = [
//   "Correct all future dates like June 2025",
//   "Fix spelling & spacing issues e.g. syst ems --> systems",
//   "Hyperlink missing GitHub & LinkedIn profiles",
//   "Add measurable results (accuracy, performance,...)",
// ];

// const strengths = [
//   "Strong keyword alignment with modern AI roles.",
//   "Clean, single-column layout optimized for ATS parsing.",
// ];

// const weaknesses = [
//   "Presence of future dates, creating credibility concerns.",
//   "Lack of quantified achievements and measurable impact.",
// ];

// const inDepth = [
//   {
//     label: "Formatting",
//     color: "text-green-600",
//     text: "Clean, single-column and ATS-friendly. Minor spacing and typographical errors reduce professionalism and should be corrected. Dates need consistent formatting.",
//   },
//   {
//     label: "Content",
//     color: "text-yellow-600",
//     text: "Strong technical alignment with AI roles, but impact is weak. Descriptions focus on tasks rather than measurable results. Adding metrics and performance outcomes is essential.",
//   },
//   {
//     label: "Keywords",
//     color: "text-green-600",
//     text: "Excellent optimization for NLP and Generative AI roles. Including broader industry terms like Git, SQL, Cloud, and Deployment would improve versatility.",
//   },
//   {
//     label: "Structure",
//     color: "text-blue-600",
//     text: "Logical and well-organized. Projects should be more prominent given junior positioning. Minor consolidation could improve flow.",
//   },
//   {
//     label: "Missing Sections",
//     color: "text-orange-600",
//     text: "Certifications should be separated from courses. Adding GitHub links and optional awards would strengthen credibility.",
//   },
//   {
//     label: "Achievement Quality",
//     color: "text-red-600",
//     text: "Low due to lack of quantified impact. Converting responsibilities into measurable achievements would significantly raise competitiveness.",
//   },
//   {
//     label: "ATS Compatibility",
//     color: "text-blue-600",
//     text: "High overall, with minor formatting fixes needed to maximize parsing accuracy.",
//   },
// ];

// export default function CVCoach() {
//   const { data  }   = useQuery<CvAnalysisResponse | null , Error >({
//     queryKey: ["cv-analysis"],
//     queryFn : async () => null,
//     enabled: false,
//   });
//   console.log(data);

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans p-4  mx-auto">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">CV Coach</h1>
//         <p className="text-gray-500 text-sm mt-1">Create a professional CV now to apply for jobs</p>
//       </div>

//       {/* Upload */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 flex items-center gap-3 shadow-sm">
//         <Upload size={18} className="text-gray-400" />
//         <div>
//           <p className="text-sm font-semibold text-gray-700">Upload your CV</p>
//           <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
//             <FileText size={12} />{data?.filename}
//           </p>
//         </div>
//       </div>

//       {/* ATS Score + Critical Issues */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         {/* ATS Score */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <p className="text-sm font-semibold text-gray-600 mb-2">Your ATS score</p>
//           <p className="text-3xl font-bold text-gray-900 text-right mb-2">{data?.analysis.overall_score}/ 100</p>
//           <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
//             <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${data?.analysis.overall_score}%` }} />
//           </div>
//           <div className="flex items-center gap-1 mb-1">
//             <TrendingUp size={14} className="text-blue-500" />
//             <span className="text-xs font-semibold text-gray-700">ATS Compatibility:</span>
//             <span className="text-xs font-bold text-blue-600">High</span>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2 text-xs">
//             <span className="flex items-center gap-1">
//               <CheckCircle2 size={11} className="text-green-500" /> Parsing:{" "}
//               <b className="text-green-600">Good</b>
//             </span>
//             <span className="flex items-center gap-1">
//               <CheckCircle2 size={11} className="text-green-500" /> Keywords:{" "}
//               <b className="text-green-600">Strong</b>
//             </span>
//             <span className="flex items-center gap-1">
//               <AlertTriangle size={11} className="text-red-500" /> Risks:{" "}
//               <b className="text-red-600">Found</b>
//             </span>
//           </div>
//         </div>

//         {/* Critical Issues */}
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm">
//           <div className="flex items-center gap-2 mb-3">
//             <AlertTriangle size={16} className="text-red-500" />
//             <span className="text-sm font-bold text-red-700">Critical issues detected</span>
//           </div>
//           <ul className="space-y-1.5">
//             {criticalIssues.map((issue, i) => (
//               <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
//                 <span className="mt-0.5 text-red-400">•</span>
//                 {issue}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Score Breakdown */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-4">
//         <p className="text-sm font-semibold text-gray-700 mb-3">Score Breakdown</p>
//         <div className="space-y-2.5">
//           {scoreData.map(({ label, score, color }) => (
//             <div key={label} className="flex items-center gap-3">
//               <span className="text-xs font-semibold text-white bg-gray-700 rounded px-2 py-0.5 w-24 text-center">
//                 {label}
//               </span>
//               <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
//                 <div
//                   className={`${color} h-4 rounded-full transition-all`}
//                   style={{ width: `${score}%` }}
//                 />
//               </div>
//               <span className="text-xs font-bold text-gray-600 w-8 text-right">{score}%</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Strengths & Weaknesses */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <Flame size={15} className="text-orange-500" />
//             <span className="text-sm font-bold text-gray-800">Strengths</span>
//           </div>
//           <ul className="space-y-1.5">
//             {strengths.map((s, i) => (
//               <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
//                 <span className="text-green-400 mt-0.5">•</span>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <AlertCircle size={15} className="text-red-500" />
//             <span className="text-sm font-bold text-gray-800">Weaknesses</span>
//           </div>
//           <ul className="space-y-1.5">
//             {weaknesses.map((w, i) => (
//               <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
//                 <span className="text-red-400 mt-0.5">•</span>
//                 {w}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Missing Sections + What to fix */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <p className="text-sm font-bold text-gray-800 mb-2">Missing sections</p>
//           <ul className="space-y-1.5">
//             {missingSections.map((s, i) => (
//               <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
//                 <span className="text-orange-400 mt-0.5">•</span>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <p className="text-sm font-bold text-gray-800 mb-2">What to fix first?</p>
//           <ul className="space-y-1.5">
//             {whatToFix.map((s, i) => (
//               <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
//                 <span className="text-blue-400 mt-0.5">•</span>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* In-Depth Analysis */}
//       <Accordion
//         type="single"
//         collapsible
//         defaultValue="analysis"
//         className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
//       >
//         <AccordionItem value="analysis" className="border-none">
//           <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 [&>svg]:text-gray-400">
//             <div className="flex items-center gap-2">
//               <TrendingUp size={16} className="text-blue-500" />
//               <span className="text-sm font-bold text-gray-800">In-Depth Analysis</span>
//             </div>
//           </AccordionTrigger>
//           <AccordionContent className="px-4 pb-4 border-t border-gray-100 pt-3">
//             <div className="space-y-2.5">
//               {inDepth.map(({ label, color, text }) => (
//                 <p key={label} className="text-xs text-gray-600 leading-relaxed">
//                   <span className={`font-bold ${color}`}>{label}: </span>
//                   {text}
//                 </p>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }


// "use client";

// import {
//   AlertTriangle,
//   Upload,
//   TrendingUp,
//   Flame,
//   AlertCircle,
//   FileText,
// } from "lucide-react";

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import { useQuery } from "@tanstack/react-query";
// import { CvAnalysisResponse } from "@/lib/types/cv-analysis";

// export default function CVCoach() {
//   const { data } = useQuery<CvAnalysisResponse>({
//     queryKey: ["cv-analysis"],
//     enabled: false,
//   });

  // if (!data) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center text-gray-500">
  //       No CV analyzed yet. Upload your CV to see results.
  //     </div>
  //   );
  // }

//   const { analysis, filename } = data;

//   const getScoreColor = (score: number) => {
//     if (score < 50) return "bg-red-500";
//     if (score < 80) return "bg-yellow-400";
//     return "bg-green-500";
//   };

//   const getTextColor = (score: number) => {
//     if (score < 50) return "text-red-600";
//     if (score < 80) return "text-yellow-600";
//     return "text-green-600";
//   };

//   const scoreData = [
//     { label: "Formatting", score: analysis.formatting_score },
//     { label: "Content", score: analysis.content_score },
//     { label: "Keywords", score: analysis.keywords_score },
//     { label: "Structure", score: analysis.structure_score },
//   ];

//   const strengths = analysis.strengths ?? [];
//   const weaknesses = analysis.weaknesses ?? [];
//   const missingSections = analysis.detailed_analysis.missing_sections ?? [];
//   const whatToFix = analysis.recommendations ?? [];

//   const inDepth = [
//     { label: "Formatting", text: analysis.detailed_analysis.formatting },
//     { label: "Content", text: analysis.detailed_analysis.content },
//     { label: "Keywords", text: analysis.detailed_analysis.keywords },
//     { label: "Structure", text: analysis.detailed_analysis.structure },
//     {
//       label: "Achievement Quality",
//       text: analysis.detailed_analysis.achievement_quality,
//     },
//     {
//       label: "ATS Compatibility",
//       text: analysis.detailed_analysis.ats_compatibility,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans p-4 mx-auto">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
//           CV Coach
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           Create a professional CV now to apply for jobs
//         </p>
//       </div>

//       {/* Upload */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 flex items-center gap-3 shadow-sm">
//         <Upload size={18} className="text-gray-400" />
//         <div>
//           <p className="text-sm font-semibold text-gray-700">
//             Upload your CV
//           </p>
//           <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
//             <FileText size={12} />
//             {filename}
//           </p>
//         </div>
//       </div>

//       {/* ATS Score */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-4">
//         <p className="text-sm font-semibold text-gray-600 mb-2">
//           Your ATS score
//         </p>

//         <p
//           className={`text-3xl font-bold text-right mb-2 ${getTextColor(
//             analysis.overall_score
//           )}`}
//         >
//           {analysis.overall_score} / 100
//         </p>

//         <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
//           <div
//             className={`${getScoreColor(
//               analysis.overall_score
//             )} h-3 rounded-full transition-all duration-500`}
//             style={{ width: `${analysis.overall_score}%` }}
//           />
//         </div>

//         <div className="flex items-center gap-1">
//           <TrendingUp size={14} className="text-blue-500" />
//           <span className="text-xs font-semibold text-gray-700">
//             ATS Compatibility:
//           </span>
//           <span className="text-xs font-bold text-blue-600">
//             {analysis.detailed_analysis.ats_compatibility}
//           </span>
//         </div>
//       </div>

//       {/* Score Breakdown */}
//       <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-4">
//         <p className="text-sm font-semibold text-gray-700 mb-3">
//           Score Breakdown
//         </p>

//         <div className="space-y-3">
//           {scoreData.map(({ label, score }) => (
//             <div key={label} className="flex items-center gap-3">
//               <span className="text-xs font-semibold text-white bg-gray-700 rounded px-2 py-0.5 w-24 text-center">
//                 {label}
//               </span>

//               <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
//                 <div
//                   className={`${getScoreColor(
//                     score
//                   )} h-4 rounded-full transition-all duration-500`}
//                   style={{ width: `${score}%` }}
//                 />
//               </div>

//               <span
//                 className={`text-xs font-bold w-10 text-right ${getTextColor(
//                   score
//                 )}`}
//               >
//                 {score}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Strengths & Weaknesses */}
//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <Flame size={15} className="text-orange-500" />
//             <span className="text-sm font-bold text-gray-800">
//               Strengths
//             </span>
//           </div>
//           <ul className="space-y-1.5">
//             {strengths.map((s, i) => (
//               <li key={i} className="text-xs text-gray-600 flex gap-2">
//                 <span className="text-green-500">•</span>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <div className="flex items-center gap-2 mb-2">
//             <AlertCircle size={15} className="text-red-500" />
//             <span className="text-sm font-bold text-gray-800">
//               Weaknesses
//             </span>
//           </div>
//           <ul className="space-y-1.5">
//             {weaknesses.map((w, i) => (
//               <li key={i} className="text-xs text-gray-600 flex gap-2">
//                 <span className="text-red-500">•</span>
//                 {w}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//            {/* Missing sections & What to fix */}
//             <div className="grid grid-cols-2 gap-4 mb-4">
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <p className="text-sm font-bold text-gray-800 mb-2">Missing sections</p>
//           <ul className="space-y-1.5">
//             {missingSections.map((s, i) => (
//               <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
//                 <span className="text-orange-400 mt-0.5">•</span>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
//           <p className="text-sm font-bold text-gray-800 mb-2">What to fix first?</p>
//           <ul className="space-y-1.5">
//             {whatToFix.map((s, i) => (
//               <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
//                 <span className="text-blue-400 mt-0.5">•</span>
//                 {s}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* In-Depth Analysis */}
//       <Accordion
//         type="single"
//         collapsible
//         defaultValue="analysis"
//         className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
//       >
//         <AccordionItem value="analysis" className="border-none">
//           <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50">
//             <div className="flex items-center gap-2">
//               <TrendingUp size={16} className="text-blue-500" />
//               <span className="text-sm font-bold text-gray-800">
//                 In-Depth Analysis
//               </span>
//             </div>
//           </AccordionTrigger>

//           <AccordionContent className="px-4 pb-4 border-t border-gray-100 pt-3">
//             <div className="space-y-2">
//               {inDepth.map(({ label, text }) => (
//                 <p key={label} className="text-xs text-gray-600 leading-relaxed">
//                   <span className="font-bold text-blue-600">
//                     {label}:{" "}
//                   </span>
//                   {text}
//                 </p>
//               ))}
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }



"use client";
import {
  AlertTriangle,
  Upload,
  TrendingUp,
  Flame,
  AlertCircle,
  FileText,
  CheckCircle2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { CvAnalysisResponse } from "@/lib/types/cv-analysis";
import { Link } from "@/i18n/navigation";

// Helper: map score to color
function getBarColor(score: number) {
  if (score >= 80) return "bg-green-500";
  if (score >= 65) return "bg-yellow-400";
  return "bg-red-400";
}

// Helper: ATS label
function getATSLabel(score: number) {
  if (score >= 80) return { label: "High", color: "text-green-600" };
  if (score >= 60) return { label: "Moderate", color: "text-yellow-600" };
  return { label: "Low", color: "text-red-600" };
}

export default function CVCoach() {
  const { data } = useQuery<CvAnalysisResponse | null, Error>({
    queryKey: ["cv-analysis"],
    queryFn: async () => null,
    enabled: false,
  });

  //Guard 
  if (!data) {
  return (
    <div className=" bg-gray-50 font-sans p-4 mx-auto h-screen flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">CV Coach</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create a professional CV now to apply for jobs
        </p>
      </div>

      {/* Empty State Card */}
      <div className="flex- flex items-center  justify-center ">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 flex flex-col items-center gap-4 w-full text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
            <FileText size={26} className="text-blue-400" />
          </div>
          <div>
            <p className="text-base font-bold text-gray-800">No CV analyzed yet</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Upload your CV to get your ATS score, keyword suggestions, and personalized tips.
            </p>
          </div>
          <Link
            href="/cv"
            className="mt-1 flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          >
            <Upload size={15} />
            Upload your CV
          </Link>
        </div>
      </div>
    </div>
  );
}

  const analysis = data?.analysis;
  const ats = getATSLabel(analysis?.overall_score ?? 0);

  const scoreBreakdown = analysis
    ? [
        { label: "Formatting", score: analysis.formatting_score },
        { label: "Content", score: analysis.content_score },
        { label: "Keywords", score: analysis.keywords_score },
        { label: "Structure", score: analysis.structure_score },
      ]
    : [];

  const inDepth = analysis
    ? [
        { label: "Formatting", color: "text-green-600", text: analysis.detailed_analysis.formatting },
        { label: "Content", color: "text-yellow-600", text: analysis.detailed_analysis.content },
        { label: "Keywords", color: "text-green-600", text: analysis.detailed_analysis.keywords },
        { label: "Structure", color: "text-blue-600", text: analysis.detailed_analysis.structure },
        {
          label: "Achievement Quality",
          color: "text-red-600",
          text: analysis.detailed_analysis.achievement_quality,
        },
        {
          label: "ATS Compatibility",
          color: "text-blue-600",
          text: analysis.detailed_analysis.ats_compatibility,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">CV Coach</h1>
        <p className="text-gray-500 text-sm mt-1">
          Create a professional CV now to apply for jobs
        </p>
      </div>

      {/* Upload */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 flex items-center gap-3 shadow-sm">
        <Upload size={18} className="text-gray-400" />
        <div>
          <p className="text-sm font-semibold text-gray-700">Upload your CV</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <FileText size={12} />
            {data?.filename ?? "No file uploaded"}
          </p>
        </div>
      </div>

      {/* ATS Score + Critical Issues */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* ATS Score */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm font-semibold text-gray-600 mb-2">Your ATS score</p>
          <p className="text-3xl font-bold text-gray-900 text-right mb-2">
            {analysis?.overall_score ?? "--"} / 100
          </p>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${analysis?.overall_score ?? 0}%` }}
            />
          </div>
          <div className="flex items-center gap-1 mb-1">
            <TrendingUp size={14} className="text-blue-500" />
            <span className="text-xs font-semibold text-gray-700">ATS Compatibility:</span>
            <span className={`text-xs font-bold ${ats.color}`}>{ats.label}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 text-xs">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={11} className="text-green-500" /> Parsing:{" "}
              <b className="text-green-600">Good</b>
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 size={11} className="text-green-500" /> Keywords:{" "}
              <b className="text-green-600">
                {(analysis?.keywords_score ?? 0) >= 80 ? "Strong" : "Moderate"}
              </b>
            </span>
            <span className="flex items-center gap-1">
              <AlertTriangle size={11} className="text-red-500" /> Risks:{" "}
              <b className="text-red-600">
                {(analysis?.weaknesses?.length ?? 0) > 0 ? "Found" : "None"}
              </b>
            </span>
          </div>
        </div>

        {/* Critical Issues = Weaknesses */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-red-500" />
            <span className="text-sm font-bold text-red-700">Critical issues detected</span>
          </div>
          <ul className="space-y-1.5">
            {(analysis?.weaknesses ?? []).map((issue, i) => (
              <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                <span className="mt-0.5 text-red-400">•</span>
                {issue}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">Score Breakdown</p>
        <div className="space-y-2.5">
          {scoreBreakdown.map(({ label, score }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white bg-gray-700 rounded px-2 py-0.5 w-24 text-center">
                {label}
              </span>
              <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                <div
                  className={`${getBarColor(score)} h-4 rounded-full transition-all`}
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-600 w-8 text-right">{score}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={15} className="text-orange-500" />
            <span className="text-sm font-bold text-gray-800">Strengths</span>
          </div>
          <ul className="space-y-1.5">
            {(analysis?.strengths ?? []).map((s, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-green-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={15} className="text-red-500" />
            <span className="text-sm font-bold text-gray-800">Weaknesses</span>
          </div>
          <ul className="space-y-1.5">
            {(analysis?.weaknesses ?? []).map((w, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-red-400 mt-0.5">•</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Sections + Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm font-bold text-gray-800 mb-2">Missing sections</p>
          <ul className="space-y-1.5">
            {(analysis?.detailed_analysis.missing_sections ?? []).map((s, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-orange-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
          <p className="text-sm font-bold text-gray-800 mb-2">What to fix first?</p>
          <ul className="space-y-1.5">
            {(analysis?.recommendations ?? []).map((s, i) => (
              <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                <span className="text-blue-400 mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggested Keywords */}
      {(analysis?.detailed_analysis.suggested_keywords?.length ?? 0) > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-4">
          <p className="text-sm font-bold text-gray-800 mb-2">Suggested Keywords to Add</p>
          <div className="flex flex-wrap gap-2">
            {analysis!.detailed_analysis.suggested_keywords.map((kw, i) => (
              <span
                key={i}
                className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-0.5 font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* In-Depth Analysis */}
      <Accordion
        type="single"
        collapsible
        defaultValue="analysis"
        className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <AccordionItem value="analysis" className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-gray-50 [&>svg]:text-gray-400">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-500" />
              <span className="text-sm font-bold text-gray-800">In-Depth Analysis</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 border-t border-gray-100 pt-3">
            <div className="space-y-2.5">
              {inDepth.map(({ label, color, text }) => (
                <p key={label} className="text-xs text-gray-600 leading-relaxed">
                  <span className={`font-bold ${color}`}>{label}: </span>
                  {text}
                </p>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}