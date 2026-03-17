import { Nav } from "@/components/Nav";

export default function TeamsPage() {
  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Teams</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          Teams view (list and detail to be implemented).
        </p>
      </header>
      <Nav />
      <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "1.5rem" }}>
        Coming soon: teams list, team detail with chat/tasks/meetings.
      </p>
    </main>
  );
}
