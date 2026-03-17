"use client";

import { useEffect, useState } from "react";
import type { Task } from "@/lib/api";
import { fetchTasks } from "@/lib/api";
import { buildTaskFilterParams, type TaskFilter } from "@/lib/filters";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TaskFilter>("today");
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const params = buildTaskFilterParams(filter);
      const data = await fetchTasks(params);
      setTasks(data);
    } catch (err: any) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function updateProgress(taskId: string, progress: number) {
    try {
      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress }),
      });
      if (!res.ok) throw new Error("Failed to update progress");
      await load();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ marginTop: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>Filter:</span>
        {[
          { id: "today", label: "Today" },
          { id: "this_week", label: "This week" },
          { id: "overdue", label: "Overdue" },
          { id: "all", label: "All" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as TaskFilter)}
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: "999px",
              border: "1px solid #1f2937",
              background: filter === f.id ? "#fbbf24" : "#020617",
              color: filter === f.id ? "#111827" : "#e5e7eb",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && (
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>Loading tasks…</p>
      )}
      {error && (
        <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "0.75rem" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              border: "1px solid #1f2937",
              borderRadius: "0.75rem",
              padding: "0.9rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div style={{ fontWeight: 500 }}>{task.title}</div>
            {task.description && (
              <div style={{ color: "#9ca3af", fontSize: "0.85rem" }}>
                {task.description}
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "0.5rem",
                gap: "0.75rem",
              }}
            >
              <div
                style={{ color: "#6b7280", fontSize: "0.8rem" }}
              >
                Priority: {task.priority} · Status: {task.status}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={task.progress}
                  onChange={(e) =>
                    updateProgress(task.id, Number(e.target.value))
                  }
                  style={{ width: "120px" }}
                />
                <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
                  {task.progress}%
                </span>
              </div>
            </div>
          </li>
        ))}
        {!loading && tasks.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No tasks for this filter.</p>
        )}
      </ul>
    </div>
  );
}
