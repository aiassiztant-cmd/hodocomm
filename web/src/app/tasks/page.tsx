import { Nav } from "@/components/Nav";
import { fetchTasks } from "@/lib/api";

export default async function TasksPage() {
  const tasks = await fetchTasks();

  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Tasks</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          All tasks (filters and editing to be added).
        </p>
      </header>
      <Nav />
      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
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
          </li>
        ))}
        {tasks.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>No tasks yet.</p>
        )}
      </ul>
    </main>
  );
}
