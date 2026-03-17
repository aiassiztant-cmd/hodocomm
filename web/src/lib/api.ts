const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export type Task = {
  id: string;
  title: string;
  description?: string | null;
  team_id: string;
  assignee_id?: string | null;
  priority: string;
  due_date?: string | null;
  due_time?: string | null;
  status: string;
  progress: number;
};

export type Meeting = {
  id: string;
  title: string;
  description?: string | null;
  team_id: string;
  start_at: string;
  end_at?: string | null;
  location?: string | null;
  owner_id: string;
  priority: string;
};

export async function fetchTasks(params: URLSearchParams = new URLSearchParams()): Promise<Task[]> {
  const url = `${API_URL}/tasks?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function fetchMeetings(params: URLSearchParams = new URLSearchParams()): Promise<Meeting[]> {
  const url = `${API_URL}/meetings?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch meetings");
  return res.json();
}
