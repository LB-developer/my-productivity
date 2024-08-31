import { useQuery } from '@tanstack/react-query'
import { fetchTechnologies } from '../../api/clientapi/aboutme'

export const useGetTechnologies = () => {
  return useQuery({
    queryKey: ['technologies'],
    queryFn: fetchTechnologies,
  })
}
