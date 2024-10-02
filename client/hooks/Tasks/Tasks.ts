import { useQuery } from "@tanstack/react-query"
import { fetchLastThirtyMinutes } from "../../../api/clientapi/tasks"
import { fetchTotalHoursCompleted } from "../../../api/clientapi/tasks"

export function useGetLastThirty(userId: string) {
  return useQuery({
    queryKey: ["last-30"],
    queryFn: () => fetchLastThirtyMinutes(userId),
  })
}

export const useGetTotalHoursCompleted = (userId: number) => {
  return useQuery({
    queryKey: ["total-hours"],
    queryFn: () => fetchTotalHoursCompleted(userId),
  })
}
