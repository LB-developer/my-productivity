import { useQuery } from "@tanstack/react-query"
import { fetchCoursesPreview } from "../../api/courses"

export const useGetCoursesPreview = (userId: number) => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCoursesPreview(userId),
  })
}
