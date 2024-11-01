import { useQuery } from "@tanstack/react-query"
import { fetchTodaysTasks } from "../../api/tasks"

export function useGetTodaysTasks(publicUserId: string) {
  return useQuery({
    queryKey: [`todays-tasks ${publicUserId}`],
    queryFn: () => fetchTodaysTasks(publicUserId),
  })
}
