import { useQuery } from '@tanstack/react-query'
import {
  fetchCoursesPreview,
  fetchTotalHoursCompleted,
} from '../../../api/clientapi/courses'

export const useGetTotalHoursCompleted = (userId: number) => {
  return useQuery({
    queryKey: ['total-hours'],
    queryFn: () => fetchTotalHoursCompleted(userId),
  })
}

export const useGetCoursesPreview = (userId: number) => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => fetchCoursesPreview(userId),
  })
}