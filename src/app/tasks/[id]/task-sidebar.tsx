"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

export type SidebarTask = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
};

const statusOptions = [
  "all",
  "pending",
  "in-progress",
  "done",
  "blocked",
  "deferred",
  "cancelled",
  "review",
];

const priorityOptions = ["all", "high", "medium", "low"];

export default function TaskSidebar({
  tasks,
  currentId,
}: {
  tasks: SidebarTask[];
  currentId: number;
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");

  const filtered = useMemo(() => {
    return tasks
      .filter((t) =>
        search
          ? (t.title + " " + t.description)
              .toLowerCase()
              .includes(search.toLowerCase())
          : true,
      )
      .filter((t) => (status === "all" ? true : t.status === status))
      .filter((t) => (priority === "all" ? true : t.priority === priority));
  }, [tasks, search, status, priority]);

  return (
    <aside className="sticky top-6 h-[calc(100vh-3rem)] overflow-hidden lg:min-w-[22rem]">
      <div className="bg-white border rounded-xl shadow-sm p-4">
        <div className="mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder:text-gray-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "all" ? "All Statuses" : opt}
              </option>
            ))}
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            {priorityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "all" ? "All Priorities" : opt}
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-700 mb-2">
          Showing {filtered.length} of {tasks.length}
        </div>

        <div className="overflow-y-auto pr-1" style={{ maxHeight: "60vh" }}>
          <ul className="space-y-1">
            {filtered.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tasks/${t.id}`}
                  className={`block rounded-lg px-0 py-0 border transition-colors ${
                    t.id === currentId
                      ? "bg-blue-50 border-blue-200 text-blue-900"
                      : "bg-white hover:bg-gray-50 border-gray-200 text-gray-800"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between gap-2 px-3 py-2 border-l-4 ${
                      t.priority === "high"
                        ? "border-red-500"
                        : t.priority === "medium"
                          ? "border-yellow-500"
                          : "border-green-500"
                    }`}
                  >
                    <span className="font-medium truncate">
                      {t.id}. {t.title}
                    </span>
                    <span
                      className={`text-[11px] leading-none px-2 py-1 rounded-full border whitespace-nowrap break-keep ${
                        t.status === "done"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : t.status === "in-progress"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : t.status === "blocked"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : t.status === "deferred"
                                ? "bg-gray-50 text-gray-700 border-gray-200"
                                : t.status === "review"
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="mt-1 px-3 pb-2 text-xs text-gray-800 truncate">
                    {t.description}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
