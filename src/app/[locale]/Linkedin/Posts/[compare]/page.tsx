"use client"

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LinkedinPost } from "@/lib/types/posts";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft, Mail, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useCompare from "../hooks/use-compare";

type CompareResponse = {
  score: number;
  matched_skills: string[];
  unmatched_skills: string[];
  experience_match: boolean;
  education_match: boolean;
  analysis: string;
  hr_email: string;
};

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const stroke = 9;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = circumference - (score / 100) * circumference;

  const color =
    score >= 75 ? "#2563eb" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg width="144" height="144" viewBox="0 0 144 144">
          <circle
            cx="72"
            cy="72"
            r={normalizedRadius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          <circle
            cx="72"
            cy="72"
            r={normalizedRadius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            transform="rotate(-90 72 72)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {score}%
          </span>
          <span className="text-xs text-gray-400 font-medium">Match Score</span>
        </div>
      </div>
      <p className="text-lg font-bold text-gray-800">
        {score >= 75 ? "Strong Match!" : score >= 50 ? "Partial Match!" : "Low Match!"}
      </p>
    </div>
  );
}

export default function ComparePage() {
  const params = useSearchParams();
  const router = useRouter();
  const [result] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<LinkedinPost | null>(null);
  const [analysisOpen, setAnalysisOpen] = useState(true);
const { isPending, error: compareError, compare}=useCompare();


  useEffect(() => {
    const raw = params.get("post");
    if (!raw) return;

    let parsed: LinkedinPost;
    try {
      parsed = JSON.parse(decodeURIComponent(raw));
      setPost(parsed);
    } catch {
      setError("Invalid job data.");
      setLoading(false);
      return;
    }
compare(parsed);

  }, []);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  if (error || compareError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 font-medium">{error}</p>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={16} className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!result || !post) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-xl mx-auto px-4 pt-8">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-6 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Job Description Analysis</h1>
          <p className="text-gray-400 text-sm mt-1">Here&apos;s how your CV stacks up against the job requirements</p>
        </div>

        {/* Job Post Card */}
        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                <span className="text-gray-500 text-lg font-bold">
                  {post.company_name?.charAt(0) ?? "C"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{post.job_title}</p>
                <p className="text-sm text-gray-400">{post.company_name} · {post.experience_years}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.job_description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Score Ring Card */}
        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-6 flex justify-center">
            <ScoreRing score={result.score} />
          </CardContent>
        </Card>

        {/* Skills Card */}
        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Matched */}
              <div>
                <p className="text-green-600 font-semibold text-sm mb-2">Matched Skills</p>
                <ul className="space-y-1">
                  {result.matched_skills.length > 0 ? (
                    result.matched_skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="mt-1 text-gray-400">·</span> {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">None</li>
                  )}
                </ul>
              </div>

              {/* Unmatched */}
              <div className="border-l border-gray-100 pl-4">
                <p className="text-red-500 font-semibold text-sm mb-2">Unmatched Skills</p>
                <ul className="space-y-1">
                  {result.unmatched_skills.length > 0 ? (
                    result.unmatched_skills.map((skill, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="mt-1 text-gray-400">·</span> {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">None</li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience & Education */}
        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-semibold text-sm">· Experience:</span>
                <span className={`text-sm font-medium ${result.experience_match ? "text-green-600" : "text-red-500"}`}>
                  {result.experience_match ? "Match found" : "Not matched"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-semibold text-sm">· Education:</span>
                <span className={`text-sm font-medium ${result.education_match ? "text-green-600" : "text-red-500"}`}>
                  {result.education_match ? "Match found" : "Not matched"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Card */}
        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-0">
            <button
              onClick={() => setAnalysisOpen((o) => !o)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-t-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <span className="font-semibold text-gray-800">Analysis</span>
              </div>
              {analysisOpen ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>
            {analysisOpen && (
              <div className="px-4 pb-4">
                <div className="h-px bg-gray-100 mb-3" />
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{result.analysis}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* HR Email Card */}
        {result.hr_email && (
          <Card className="border border-gray-100 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Send your CV to:</p>
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[180px]">
                    {result.hr_email}
                  </p>
                </div>
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm shrink-0"
                onClick={() => window.open(`mailto:${result.hr_email}`, "_blank")}
              >
                HR Email Here
              </Button>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}