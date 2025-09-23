"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePageTitle } from "@/hooks/use-page-title";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PauseCircleIcon,
  XCircleIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface Subtask {
  id: number;
  title: string;
  description: string;
  dependencies: string[];
  details: string;
  status: string;
  testStrategy: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  details: string;
  testStrategy: string;
  priority: string;
  dependencies: number[];
  status: string;
  subtasks?: Subtask[];
}

interface TasksData {
  master: {
    tasks: Task[];
  };
}

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: ClockIcon,
    label: "Pending",
  },
  "in-progress": {
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: EyeIcon,
    label: "In Progress",
  },
  done: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircleIcon,
    label: "Done",
  },
  blocked: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: ExclamationTriangleIcon,
    label: "Blocked",
  },
  deferred: {
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: PauseCircleIcon,
    label: "Deferred",
  },
  cancelled: {
    color: "bg-red-50 text-red-600 border-red-200",
    icon: XCircleIcon,
    label: "Cancelled",
  },
  review: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: EyeIcon,
    label: "Review",
  },
};

const priorityColors = {
  high: "border-l-red-500 bg-red-50/50",
  medium: "border-l-yellow-500 bg-yellow-50/50",
  low: "border-l-green-500 bg-green-50/50",
};

export default function TasksPage() {
  const [tasksData, setTasksData] = useState<TasksData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTasks, setExpandedTasks] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");

  // Update page title and description
  usePageTitle(
    "Task Master",
    "Manage and track your development tasks. View task details, dependencies, and progress across all your projects."
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error(
            `Failed to load tasks: ${response.status} ${response.statusText}`,
          );
        }
        const data = await response.json();
        setTasksData(data);
      } catch (err) {
        console.error("Error loading tasks:", err);
        setError(err instanceof Error ? err.message : "Failed to load tasks");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const toggleTaskExpansion = (taskId: number) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const filteredTasks = useMemo(() => {
    if (!tasksData?.master?.tasks) return [];

    return tasksData.master.tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subtasks?.some(
          (subtask) =>
            subtask.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subtask.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );

      // Status filter
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasksData, searchTerm, statusFilter, priorityFilter]);

  const taskStats = useMemo(() => {
    if (!tasksData?.master?.tasks)
      return { total: 0, completed: 0, pending: 0, inProgress: 0, blocked: 0 };

    const tasks = tasksData.master.tasks;
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.status === "done").length,
      pending: tasks.filter((t) => t.status === "pending").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      blocked: tasks.filter((t) => t.status === "blocked").length,
    };
  }, [tasksData]);

  const renderStatusIcon = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;
    return React.createElement(config.icon, { className: "w-4 h-4" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Tasks</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!tasksData?.master?.tasks) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-center">
          <h1 className="text-2xl font-bold mb-4">No Tasks Found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Task Master Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and track your project tasks with detailed insights
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-gray-900">
                  {taskStats.total}
                </div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-green-600">
                  {taskStats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-blue-600">
                  {taskStats.inProgress}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-yellow-600">
                  {taskStats.pending}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="text-2xl font-bold text-red-600">
                  {taskStats.blocked}
                </div>
                <div className="text-sm text-gray-600">Blocked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks, descriptions, and details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {(searchTerm || statusFilter !== "all" || priorityFilter !== "all") && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              Showing {filteredTasks.length} of {taskStats.total} tasks
              {searchTerm && ` matching "${searchTerm}"`}
              {statusFilter !== "all" &&
                ` with status "${statusConfig[statusFilter as keyof typeof statusConfig]?.label}"`}
              {priorityFilter !== "all" && ` with priority "${priorityFilter}"`}
            </p>
          </div>
        )}

        {/* Tasks Grid */}
        <div className="space-y-6">
          {filteredTasks.map((task) => {
            const isExpanded = expandedTasks.has(task.id);
            const statusConf =
              statusConfig[task.status as keyof typeof statusConfig];

            return (
              <div
                key={task.id}
                className={`bg-white rounded-xl shadow-sm border-l-4 transition-all duration-200 hover:shadow-md ${
                  priorityColors[
                    task.priority as keyof typeof priorityColors
                  ] || "border-l-gray-300"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Link href={`/tasks/${task.id}`} className="group">
                          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
                            Task {task.id}: {task.title}
                          </h2>
                        </Link>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1.5 ${statusConf?.color || "bg-gray-100 text-gray-800 border-gray-200"}`}
                        >
                          {renderStatusIcon(task.status)}
                          {statusConf?.label || task.status}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-medium uppercase tracking-wide ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {task.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-4">
                        {task.dependencies && task.dependencies.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-600">
                              Dependencies:
                            </span>
                            <div className="flex gap-1">
                              {task.dependencies.map((dep) => (
                                <span
                                  key={dep}
                                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                                >
                                  Task {dep}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {task.subtasks && task.subtasks.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-600">
                              Subtasks:
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                {task.subtasks.length} total
                              </span>
                              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                              <span className="text-sm text-green-600 font-medium">
                                {
                                  task.subtasks.filter(
                                    (st) => st.status === "done",
                                  ).length
                                }{" "}
                                completed
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="ml-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors flex items-center gap-2"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronDownIcon className="w-4 h-4" />
                          Collapse
                        </>
                      ) : (
                        <>
                          <ChevronRightIcon className="w-4 h-4" />
                          Expand
                        </>
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t bg-gray-50 -mx-6 -mb-6 rounded-b-xl">
                      <div className="p-6 space-y-6">
                        {task.details && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <div className="w-1 h-6 bg-blue-500 rounded"></div>
                              Implementation Details
                            </h3>
                            <div className="bg-white p-4 rounded-lg border">
                              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                                {task.details}
                              </pre>
                            </div>
                          </div>
                        )}

                        {task.testStrategy && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <div className="w-1 h-6 bg-green-500 rounded"></div>
                              Test Strategy
                            </h3>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                              <pre className="text-sm text-green-800 whitespace-pre-wrap font-mono leading-relaxed">
                                {task.testStrategy}
                              </pre>
                            </div>
                          </div>
                        )}

                        {task.subtasks && task.subtasks.length > 0 && (
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <div className="w-1 h-6 bg-purple-500 rounded"></div>
                              Subtasks ({task.subtasks.length})
                            </h3>
                            <div className="space-y-4">
                              {task.subtasks.map((subtask) => {
                                const subtaskStatusConf =
                                  statusConfig[
                                    subtask.status as keyof typeof statusConfig
                                  ];

                                return (
                                  <div
                                    key={`${task.id}.${subtask.id}`}
                                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                                  >
                                    <div className="flex items-start justify-between mb-3">
                                      <h4 className="font-semibold text-gray-900 text-lg">
                                        {task.id}.{subtask.id}: {subtask.title}
                                      </h4>
                                      <div
                                        className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${subtaskStatusConf?.color || "bg-gray-100 text-gray-800 border-gray-200"}`}
                                      >
                                        {renderStatusIcon(subtask.status)}
                                        {subtaskStatusConf?.label ||
                                          subtask.status}
                                      </div>
                                    </div>

                                    <p className="text-gray-700 mb-3 leading-relaxed">
                                      {subtask.description}
                                    </p>

                                    {subtask.dependencies &&
                                      subtask.dependencies.length > 0 && (
                                        <div className="mb-3">
                                          <span className="text-sm font-semibold text-gray-600 mr-2">
                                            Dependencies:
                                          </span>
                                          <div className="inline-flex flex-wrap gap-1">
                                            {subtask.dependencies.map((dep) => (
                                              <span
                                                key={dep}
                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                                              >
                                                {dep}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}

                                    {subtask.details && (
                                      <div className="mt-4">
                                        <h5 className="text-sm font-semibold text-gray-800 mb-2">
                                          Implementation Notes
                                        </h5>
                                        <div className="bg-gray-50 p-3 rounded-lg border">
                                          <p className="text-sm text-gray-600 leading-relaxed">
                                            {subtask.details}
                                          </p>
                                        </div>
                                      </div>
                                    )}

                                    {subtask.testStrategy && (
                                      <div className="mt-4">
                                        <h5 className="text-sm font-semibold text-gray-800 mb-2">
                                          Test Strategy
                                        </h5>
                                        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                                          <p className="text-sm text-green-700 leading-relaxed">
                                            {subtask.testStrategy}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No tasks found
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all" || priorityFilter !== "all"
                ? "Try adjusting your search or filters"
                : "No tasks available at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
