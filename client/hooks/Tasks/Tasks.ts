import { useQuery } from "@tanstack/react-query"
import { fetchLastThirtyMinutes, fetchAllTasks } from "../../api/tasks"

export function useGetUserTasks(userId: string) {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchAllTasks(userId),
  })
}

export function useGetLastThirty(userId: string) {
  return useQuery({
    queryKey: ["thirtyDayTaskHours"],
    queryFn: () => fetchLastThirtyMinutes(userId),
  })
}
