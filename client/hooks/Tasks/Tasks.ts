import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchLastThirtyMinutes, fetchAllTasks, createNewTask } from "../../api/tasks"
import { CreatedTask } from "../../models/tasks.type"


export function useGetUserTasks(publicUserId: string) {
  return useQuery({
    queryKey: [`tasks ${publicUserId}`],
    queryFn: () => fetchAllTasks(publicUserId),
  })
}

export function useGetLastThirty(publicUserId: string) {
  return useQuery({
    queryKey: ["thirtyDayTaskHours"],
    queryFn: () => fetchLastThirtyMinutes(publicUserId),
  })
}

export interface DefaultTaskParameters {
  publicUserId: string
  contextType: string | null
  contextId: number | null
  parentTaskId: number | null
}
export function useCreateNewTask() {
  const queryClient = useQueryClient();
  return useMutation<CreatedTask, Error, DefaultTaskParameters>({
    mutationFn: (taskInput) => createNewTask(taskInput),
    onSuccess: (_, { publicUserId }) => {
      queryClient.invalidateQueries({ queryKey: [`tasks ${publicUserId}`] })
    }
  })
}
