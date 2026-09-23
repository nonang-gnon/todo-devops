"use client";

import { useState } from "react";

const sampleTasks = [
  { id: 1, text: "Finish DevOps assignment", completed: false },
  { id: 2, text: "Study Next.js fundamentals", completed: false },
  { id: 3, text: "Set up Git repository", completed: true },
];

export default function Home() {
  const [tasks, setTasks] = useState(sampleTasks);
  const [newTask, setNewTask] = useState("");

  const completed = tasks.filter((task) => task.completed).length;

  function addTask() {
    const text = newTask.trim();
    if (!text) return;

    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setNewTask("");
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My ToDo App</h1>
          <p className="mt-2 text-slate-500">
            Keep your tasks in one place.
          </p>
        </header>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Your tasks</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {completed} of {tasks.length} completed
                </p>
              </div>
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
                Today
              </span>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="What do you need to do?"
                aria-label="New task"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={addTask}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                + Add Task
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">
                All tasks
              </h3>
              <span className="text-xs text-slate-400">
                {tasks.length} tasks
              </span>
            </div>

            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-4 transition-colors hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    aria-label={`Complete ${task.text}`}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span
                    className={`min-w-0 flex-1 text-sm font-medium ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-700"
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="rounded-lg px-2 py-1 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}