import { useQuery } from "@tanstack/react-query"
import { fetchUserWidgetInfo } from "../api/users"

export const useGetUserWidgetInfo = (userId: string) => {
  return useQuery({
    queryKey: [`user-info ${userId}`],
    queryFn: () => fetchUserWidgetInfo(userId),
  })
}
