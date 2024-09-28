import { useQuery } from '@tanstack/react-query'
import { fetchTotalHoursCompleted } from '../../../api/clientapi/courses'

export const useGetTotalHoursCompleted = (userId: number) => {
  return useQuery({
    queryKey: ['total-hours'],
    queryFn: () => fetchTotalHoursCompleted(userId),
  })
}
