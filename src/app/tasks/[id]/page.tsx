import { readFile } from "fs/promises";
import { join } from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import TaskSidebar, { SidebarTask } from "./task-sidebar";

type Subtask = {
  id: number;
  title: string;
  description: string;
  dependencies: string[];
  details: string;
  status: string;
  testStrategy: string;
};

type Task = {
  id: number;
  title: string;
  description: string;
  details: string;
  testStrategy: string;
  priority: string;
  dependencies: number[];
  status: string;
  subtasks?: Subtask[];
};

type TasksData = {
  master: { tasks: Task[] };
};

async function getTasks(): Promise<TasksData> {
  const tasksFilePath = join(
    process.cwd(),
    ".taskmaster",
    "tasks",
    "tasks.json",
  );
  const fileContent = await readFile(tasksFilePath, "utf-8");
  return JSON.parse(fileContent);
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const tasksData = await getTasks();
  const { id } = await params;
  const taskId = Number(id);
  const task = tasksData?.master?.tasks?.find((t) => t.id === taskId);

  if (!task) {
    notFound();
  }

  const sidebarTasks: SidebarTask[] = tasksData.master.tasks.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
  }));

  const allTasks = tasksData.master.tasks;
  const currentIndex = allTasks.findIndex((t) => t.id === task.id);
  const prevTask = currentIndex > 0 ? allTasks[currentIndex - 1] : null;
  const nextTask =
    currentIndex < allTasks.length - 1 ? allTasks[currentIndex + 1] : null;
  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks =
    task.subtasks?.filter((st) => st.status === "done").length || 0;
  const subtaskProgress = totalSubtasks
    ? Math.round((completedSubtasks / totalSubtasks) * 100)
    : 0;

  const renderStatusPill = (status: string) => (
    <span
      className={`px-3 py-1 rounded-lg text-sm font-medium border ${
        status === "done"
          ? "bg-green-100 text-green-800 border-green-200"
          : status === "in-progress"
            ? "bg-blue-100 text-blue-800 border-blue-200"
            : status === "blocked"
              ? "bg-red-100 text-red-800 border-red-200"
              : status === "deferred"
                ? "bg-gray-100 text-gray-800 border-gray-200"
                : status === "review"
                  ? "bg-purple-100 text-purple-800 border-purple-200"
                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
      }`}
    >
      {status}
    </span>
  );

  const dependencyBadge = (dep: number) => {
    const depTask = allTasks.find((t) => t.id === dep);
    return (
      <Link
        key={dep}
        href={`/tasks/${dep}`}
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
      >
        <span>Task {dep}</span>
        {depTask ? (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-white border border-blue-200 text-[10px] uppercase tracking-wide">
            {depTask.status}
          </span>
        ) : null}
      </Link>
    );
  };

  const subtaskDependencyChip = (token: string) => {
    const value = typeof token === "string" ? token : String(token ?? "");
    const match = value.match(/^(\d+)(?:\.(\d+))?$/);
    if (!match) {
      return (
        <span
          key={value}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200"
        >
          {value}
        </span>
      );
    }
    const parent = match[1];
    const child = match[2];
    if (child) {
      return (
        <Link
          key={value}
          href={`/tasks/${parent}#subtask-${parent}-${child}`}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
        >
          {value}
        </Link>
      );
    }
    return (
      <Link
        key={value}
        href={`/tasks/${parent}`}
        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
      >
        Task {parent}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:max-w-none">
        <div className="lg:col-span-4 xl:col-span-3">
          <TaskSidebar tasks={sidebarTasks} currentId={task.id} />
        </div>
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="mb-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Task {task.id}: {task.title}
                </h1>
                <p className="text-gray-800 mt-1">{task.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {renderStatusPill(task.status)}
                <span className="px-3 py-1 rounded-lg text-sm font-medium bg-white text-gray-800 border border-gray-200">
                  Priority: <span className="capitalize">{task.priority}</span>
                </span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
              <div>From tag: master</div>
              <div className="flex items-center gap-2">
                {prevTask && (
                  <Link
                    href={`/tasks/${prevTask.id}`}
                    className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
                  >
                    ← {prevTask.id}
                  </Link>
                )}
                {nextTask && (
                  <Link
                    href={`/tasks/${nextTask.id}`}
                    className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
                  >
                    {nextTask.id} →
                  </Link>
                )}
                <Link
                  href="/tasks"
                  className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50"
                >
                  Back to list
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-xl p-6 border shadow-sm">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-700">Task ID</div>
                  <div className="font-medium text-gray-900">{task.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-700">Priority</div>
                  <div className="font-medium capitalize text-gray-900">
                    {task.priority}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-700">Status</div>
                  <div className="font-medium capitalize text-gray-900">
                    {task.status}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-700">Dependencies</div>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {task.dependencies?.length ? (
                      task.dependencies.map((dep) => dependencyBadge(dep))
                    ) : (
                      <span className="text-gray-500">None</span>
                    )}
                  </div>
                </div>
                {totalSubtasks > 0 && (
                  <div className="md:col-span-2">
                    <div className="text-sm text-gray-700 mb-1">
                      Subtask Progress
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 whitespace-nowrap"
                        style={{ width: `${subtaskProgress}%` }}
                      />
                    </div>
                    <div className="mt-1 text-sm text-gray-800">
                      {completedSubtasks}/{totalSubtasks} completed (
                      {subtaskProgress}%)
                    </div>
                  </div>
                )}
              </div>
            </section>

            {task.details && (
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  Implementation Details
                </h2>
                <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono leading-relaxed">
                  {task.details}
                </pre>
              </section>
            )}

            {task.testStrategy && (
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  Test Strategy
                </h2>
                <pre className="text-sm text-green-900 whitespace-pre-wrap font-mono leading-relaxed">
                  {task.testStrategy}
                </pre>
              </section>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <section className="bg-white rounded-xl p-6 border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Subtasks ({task.subtasks.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {task.subtasks.map((subtask) => (
                    <div
                      key={`${task.id}.${subtask.id}`}
                      id={`subtask-${task.id}-${subtask.id}`}
                      className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {task.id}.{subtask.id}: {subtask.title}
                        </h3>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200 whitespace-nowrap break-keep">
                          {subtask.status}
                        </span>
                      </div>
                      <p className="text-gray-800 mt-2">
                        {subtask.description}
                      </p>
                      {subtask.dependencies &&
                        subtask.dependencies.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {subtask.dependencies.map((dep) =>
                              subtaskDependencyChip(dep),
                            )}
                          </div>
                        )}
                      {subtask.details && (
                        <div className="bg-gray-50 p-3 rounded-lg border mt-3">
                          <pre className="text-sm text-gray-900 whitespace-pre-wrap font-mono leading-relaxed">
                            {subtask.details}
                          </pre>
                        </div>
                      )}
                      {subtask.testStrategy && (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-200 mt-3">
                          <pre className="text-sm text-green-900 whitespace-pre-wrap font-mono leading-relaxed">
                            {subtask.testStrategy}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-xl p-6 border shadow-sm">
              <details>
                <summary className="cursor-pointer select-none text-sm font-medium text-gray-900">
                  Raw Task JSON (complete data)
                </summary>
                <pre className="mt-3 text-xs text-gray-900 whitespace-pre-wrap font-mono leading-relaxed">
                  {JSON.stringify(task, null, 2)}
                </pre>
              </details>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
