import type { Activity } from "../../../shared/types/activity";
import { api } from "./api";

export const activitiesService = {
  async getAll(): Promise<Activity[]> {
    const { data } = await api.get("/activities");

    return data;
  },
  async getByType(type: string): Promise<Activity[]> {
    const query = type ? `?type=${type}` : "";

    const { data } = await api.get(`/activities${query}`);

    return data;
  },
  async create(data: Omit<Activity, "_id" | "createdAt" | "updatedAt">) {
    const { data: createdActivity } = await api.post("/activities", data);

    return createdActivity;
  },
  async delete(_id: string) {
    const { data } = await api.delete(`/activities/${_id}`);

    return data;
  },
};
