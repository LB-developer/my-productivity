import { useQuery } from '@tanstack/react-query'
import { fetchAboutMe } from '../../api/clientapi/aboutme'

export const useGetAboutMe = () => {
  return useQuery({
    queryKey: ['about-me-info'],
    queryFn: fetchAboutMe,
  })
}
