"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/Nav";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function NewMeetingPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teamId, setTeamId] = useState("");
  const [startAt, setStartAt] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const body = {
        title,
        description: description || null,
        team_id: teamId || "00000000-0000-0000-0000-000000000000", // TODO: real team
        start_at: startAt ? new Date(startAt).toISOString() : new Date().toISOString(),
        end_at: null,
        location: location || null,
        owner_id: "00000000-0000-0000-0000-000000000000", // TODO: real user
        priority,
      };

      const res = await fetch(`${API_URL}/meetings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Failed to create meeting");
      }

      router.push("/meetings");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <main>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1>New Meeting</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
          Quick meeting creation (MVP placeholders for user and team).
        </p>
      </header>
      <Nav />
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "1.5rem",
          maxWidth: "480px",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <label style={{ fontSize: "0.9rem" }}>
          Title
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
            }}
          />
        </label>

        <label style={{ fontSize: "0.9rem" }}>
          Description / agenda
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
            }}
          />
        </label>

        <label style={{ fontSize: "0.9rem" }}>
          Team ID (placeholder)
          <input
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            placeholder="UUID or leave blank for default"
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
            }}
          />
        </label>

        <label style={{ fontSize: "0.9rem" }}>
          Start time
          <input
            type="datetime-local"
            value={startAt}
            onChange={(e) => setStartAt(e.target.value)}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
            }}
          />
        </label>

        <label style={{ fontSize: "0.9rem" }}>
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Zoom, Office, Home visit"
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
            }}
          />
        </label>

        <label style={{ fontSize: "0.9rem" }}>
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem 0.6rem",
              borderRadius: "0.5rem",
              border: "1px solid #1f2937",
              background: "#020617",
              color: "#e5e7eb",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </label>

        {error && (
          <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          style={{
            marginTop: "0.5rem",
            padding: "0.6rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            background: "#fbbf24",
            color: "#111827",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {status === "submitting" ? "Creating..." : "Create meeting"}
        </button>
      </form>
    </main>
  );
}
