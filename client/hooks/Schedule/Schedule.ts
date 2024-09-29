import { useQuery } from '@tanstack/react-query'
import { fetchSchedulePreview } from '../../../api/clientapi/schedule'

export function useGetSchedulePreview(userId: string) {
  return useQuery({
    queryKey: ['schedule-preview'],
    queryFn: () => fetchSchedulePreview(userId),
  })
}
