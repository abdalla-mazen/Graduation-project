"use client";

import React from "react";
import { Eye, Plus, FolderKanban, Github, ExternalLink, Code2, Trash2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Projects } from "@/lib/types/project";
import useDeleteProject from "../_hooks/use-delete";

export default function MyProjects({ projects }: { projects: Projects }) {
  const { deleteProject, isPending } = useDeleteProject();

  return (
    <>
      {/* Top Controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">
            {projects.length} Projects
          </span>
          <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Portfolio items</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Top Preview */}
            <div className="relative h-40 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                Project
              </div>

          

              <button
                type="button"
                onClick={() => deleteProject(project.id)}
                disabled={isPending}
                className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm hover:bg-blue-100 hover:text-blue-800 "
              >
                <Trash2 className="h-5 w-5" />
              </button>

              <div className="flex h-full items-center justify-center">
                <div className="rounded-2xl bg-white p-4 shadow-md">
                  <FolderKanban className="h-10 w-10 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-5">
              <h3 className="line-clamp-2 text-lg font-semibold leading-6 text-slate-900">
                {project.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                {project.description}
              </p>

              {project.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      <Code2 className="h-3.5 w-3.5" />
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-5 py-4">
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                <Eye className="h-4 w-4" />
                Demo
              </a>

              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                <Github className="h-4 w-4" />
                Github
              </a>

              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600"
              >
                <ExternalLink className="h-4 w-4" />
                Open
              </a>
            </div>
          </div>
        ))}

        {/* Add New Project Card */}
        <button className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-blue-300 bg-white/80 p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-50 hover:shadow-xl">
          <Link
            className="group flex flex-col w-full items-center"
            href="/projects/add-new-project"
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-200 transition group-hover:scale-105">
              <Plus className="h-10 w-10" />
            </div>

            <h3 className="text-xl font-semibold text-blue-700">Add New Project</h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Upload a new project to keep your work organized and accessible in one place.
            </p>
          </Link>
        </button>
      </div>
    </>
  );
}
