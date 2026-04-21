import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, Code2, GitBranch, Layers, Sparkles } from "lucide-react";
import ProjectSuggestionsSkeleton from "@/components/skeletons/project-suggestions.skeleton";
import { getSuggestProject } from "@/lib/apis/get-suggest-project.api";
import type { Suggestion, TrackData } from "@/lib/types/get-suggest-project";

const SKILL_COLORS: Record<string, string> = {
  HTML: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  CSS: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  JavaScript: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  React: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Python: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  Flask: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  PostgreSQL: "bg-blue-200 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  Git: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  GitHub: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
};

const CARD_TOP_BARS = [
  "linear-gradient(90deg,#1d4ed8,#60a5fa)",
  "linear-gradient(90deg,#2563eb,#38bdf8)",
  "linear-gradient(90deg,#0f766e,#3b82f6)",
];

const CARD_ICON_STYLES = [
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
];

const getSkillColor = (skill: string) =>
  SKILL_COLORS[skill] ??
  "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300";

function CardIcon({ index }: { index: number }) {
  const icons = [
    <Layers className="h-5 w-5" key="layers" />,
    <Code2 className="h-5 w-5" key="code" />,
    <GitBranch className="h-5 w-5" key="branch" />,
  ];

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-xl ${CARD_ICON_STYLES[index % 3]}`}
    >
      {icons[index % 3]}
    </div>
  );
}

function SuggestionCard({
  suggestion,
  index,
}: {
  suggestion: Suggestion;
  index: number;
}) {
  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border border-blue-100/80 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-blue-900/40 dark:bg-slate-950/70">
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-90"
        style={{ background: CARD_TOP_BARS[index % 3] }}
      />

      <CardHeader className="flex flex-row items-start gap-3 px-5 pb-3 pt-6">
        <CardIcon index={index} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold leading-tight text-slate-900 dark:text-white">
            {suggestion.title}
          </h3>
          <span className="text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-300">
            Project #{index + 1}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-5 pb-4">
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {suggestion.description}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-3 px-5 pb-5 pt-0">
        <div className="flex flex-wrap gap-1.5">
          {suggestion.skills.map((skill) => (
            <span
              key={skill}
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSkillColor(
                skill,
              )}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="mt-1 w-full rounded-xl border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300 dark:hover:bg-blue-950/30"
        >
          Start project
        </Button>
      </CardFooter>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-blue-200 bg-white/75 p-8 text-center shadow-sm dark:border-blue-900/40 dark:bg-slate-950/60">
      <p className="text-lg font-semibold text-slate-900 dark:text-white">
        No suggestions available right now.
      </p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Try regenerating again in a moment to fetch fresh project ideas.
      </p>
    </div>
  );
}

async function ProjectSuggestionsContent() {
  const data: TrackData = await getSuggestProject();
  const uniqueSkills = Array.from(
    new Set(data.suggestions.flatMap((suggestion) => suggestion.skills)),
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-sky-50 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-blue-950/20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-blue-600 dark:text-blue-300">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered</span>
          </div>

          <div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Project Suggestions
              </h1>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-base text-slate-600 dark:text-slate-300">
                <span>Curated project ideas for your</span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 px-2 text-sm font-semibold capitalize text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                >
                  {data.track}
                </Badge>
                <span>track</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 border-b border-blue-100/70 pb-5 text-sm text-slate-600 dark:border-blue-900/30 dark:text-slate-300">
          <span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {data.suggestions.length}
            </span>{" "}
            projects
          </span>

          <span>
            <span className="font-semibold text-slate-900 dark:text-white">{uniqueSkills}</span>{" "}
            unique skills
          </span>

          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
            Up to date
          </span>
        </div>

        {data.suggestions.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.suggestions.map((suggestion, index) => (
                <SuggestionCard
                  key={`${suggestion.title}-${index}`}
                  suggestion={suggestion}
                  index={index}
                />
              ))}
            </div>

            <p className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              Suggestions are generated based on your track and skill level.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ProjectSuggestionsSkeleton />}>
      <ProjectSuggestionsContent />
    </Suspense>
  );
}
