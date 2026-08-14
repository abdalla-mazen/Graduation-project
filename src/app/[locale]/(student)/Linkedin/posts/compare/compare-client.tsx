"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, BarChart3, ChevronDown, ChevronUp, Mail } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LinkedinPost } from "@/lib/types/posts";
import ServerErrorState from "../_components/server-error-state";
import ScoreRing from "../_components/score-ring";
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

export default function CompareClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<CompareResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serverError, setServerError] = useState(false);
  const [post, setPost] = useState<LinkedinPost | null>(null);
  const [analysisOpen, setAnalysisOpen] = useState(true);
  const {
    isPending,
    error: compareError,
    compare,
  } = useCompare((data) => {
    if (!data.matched_skills || !data.unmatched_skills) {
      setServerError(true);
      return;
    }

    setResult(data);
  });

  const runCompare = useCallback(() => {
    setServerError(false);
    setError(null);

    const raw = params.get("post");
    if (!raw) return;

    let parsed: LinkedinPost;
    try {
      parsed = JSON.parse(decodeURIComponent(raw));
      setPost(parsed);
    } catch {
      setError("Invalid job data.");
      return;
    }

    compare(parsed);
  }, [params, compare]);

  useEffect(() => {
    runCompare();
  }, [runCompare]);

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

  if (serverError) {
    return <ServerErrorState onRetry={runCompare} />;
  }

  if (error || compareError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <p className="text-red-500 font-medium">{error ?? "Something went wrong."}</p>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft size={16} className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!result || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">No data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-gray-500 hover:text-gray-800 mb-6 text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Job Description Analysis</h1>
          <p className="text-gray-400 text-sm mt-1">
            {"Here's how your CV stacks up against the job requirements"}
          </p>
        </div>

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
                <p className="text-sm text-gray-400">
                  {post.company_name} - {post.experience_years}
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {post.job_description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-6 flex justify-center">
            <ScoreRing score={result.score} />
          </CardContent>
        </Card>

        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-green-600 font-semibold text-sm mb-2">Matched Skills</p>
                <ul className="space-y-1">
                  {result.matched_skills.length > 0 ? (
                    result.matched_skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="mt-1 text-gray-400">-</span> {skill}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm text-gray-400 italic">None</li>
                  )}
                </ul>
              </div>
              <div className="lg:border-l border-gray-100 pl-4">
                <p className="text-red-500 font-semibold text-sm mb-2">Unmatched Skills</p>
                <ul className="space-y-1">
                  {result.unmatched_skills.length > 0 ? (
                    result.unmatched_skills.map((skill) => (
                      <li key={skill} className="flex items-start gap-1.5 text-sm text-gray-700">
                        <span className="mt-1 text-gray-400">-</span> {skill}
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

        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-semibold text-sm">Experience:</span>
                <span
                  className={`text-sm font-medium ${
                    result.experience_match ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {result.experience_match ? "Match found" : "Not matched"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 font-semibold text-sm">Education:</span>
                <span
                  className={`text-sm font-medium ${
                    result.education_match ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {result.education_match ? "Match found" : "Not matched"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4 border border-gray-100 shadow-sm">
          <CardContent className="p-0">
            <button
              onClick={() => setAnalysisOpen((open) => !open)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-t-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-gray-600" />
                <span className="font-semibold text-gray-800">Analysis</span>
              </div>
              {analysisOpen ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>
            {analysisOpen ? (
              <div className="px-4 pb-4">
                <div className="h-px bg-gray-100 mb-3" />
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {result.analysis}
                </p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {result.hr_email ? (
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
                className="bg-blue-600 hover:bg-blue-700 w-fit text-white text-sm shrink-0"
                onClick={() => window.open(`mailto:${result.hr_email}`, "_blank")}
              >
                HR Email Here
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
