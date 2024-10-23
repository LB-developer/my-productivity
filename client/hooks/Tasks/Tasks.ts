import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchLastThirtyMinutes, fetchAllTasks, createNewTask } from "../../api/tasks"


export function useGetUserTasks(userId: string) {
  return useQuery({
    queryKey: [`tasks ${userId}`],
    queryFn: () => fetchAllTasks(userId),
  })
}

export function useGetLastThirty(userId: string) {
  return useQuery({
    queryKey: ["thirtyDayTaskHours"],
    queryFn: () => fetchLastThirtyMinutes(userId),
  })
}

export function useCreateNewTask(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => createNewTask(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`tasks ${userId}`] })
    }
  })
}
