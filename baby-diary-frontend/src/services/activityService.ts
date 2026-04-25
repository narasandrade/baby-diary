import type { Activity } from "../../../shared/types/activity";

const API_URL = "http://localhost:5000";

export async function getActivities(type?: string) {
  const query = type ? `?type=${type}` : "";
  const res = await fetch(`${API_URL}/activities${query}`);

  return res.json();
}

export async function createActivity(
  data: Omit<Activity, "id" | "createdAt" | "updatedAt">,
) {
  const res = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
