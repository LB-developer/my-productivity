import { useQuery } from '@tanstack/react-query'
import { fetchUserWidgetInfo } from '../../api/clientapi/users'

export const useGetUserWidgetInfo = (userId: number) => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => fetchUserWidgetInfo(userId),
  })
}