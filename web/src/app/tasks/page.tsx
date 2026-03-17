import { Nav } from "@/components/Nav";
import { TaskList } from "./TaskList";

export default function TasksPage() {
  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Tasks</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          See your tasks by filter and update progress inline.
        </p>
      </header>
      <Nav />
      <div style={{ marginTop: "1.25rem" }}>
        <a
          href="/tasks/new"
          style={{
            display: "inline-block",
            padding: "0.5rem 0.9rem",
            borderRadius: "999px",
            background: "#fbbf24",
            color: "#111827",
            fontWeight: 600,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          + New task
        </a>
      </div>
      <TaskList />
    </main>
  );
}
