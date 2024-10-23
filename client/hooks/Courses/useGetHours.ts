import { useQuery } from "@tanstack/react-query"
import { fetchCoursesPreview } from "../../api/courses"

export const useGetCoursesPreview = (userId: string) => {
  return useQuery({
    queryKey: [`courses ${userId}`],
    queryFn: () => fetchCoursesPreview(userId),
  })
}
