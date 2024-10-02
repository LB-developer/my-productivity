import { useQuery } from "@tanstack/react-query"
import { fetchCoursesPreview } from "../../../api/clientapi/courses"

export const useGetCoursesPreview = (userId: number) => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => fetchCoursesPreview(userId),
  })
}
