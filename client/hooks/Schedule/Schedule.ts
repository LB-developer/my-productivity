import { useQuery } from "@tanstack/react-query"
import { fetchTodaysTasks } from "../../api/tasks"

export function useGetTodaysTasks(userId: string) {
  return useQuery({
    queryKey: ["schedule-preview"],
    queryFn: () => fetchTodaysTasks(userId),
  })
}
