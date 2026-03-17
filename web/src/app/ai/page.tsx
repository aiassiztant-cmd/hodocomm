import { Nav } from "@/components/Nav";

export default function AIPage() {
  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>Pulse AI</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          AI assistant ("What&apos;s on my plate today?", "Turn this into a task" etc.).
        </p>
      </header>
      <Nav />
      <p style={{ color: "#6b7280", fontSize: "0.9rem", marginTop: "1.5rem" }}>
        Coming soon: chat UI wired into HodoAI + hodocomm tools.
      </p>
    </main>
  );
}
