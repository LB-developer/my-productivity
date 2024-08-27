import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAboutMe } from '../../api/clientapi/aboutme'

export const useUpdateAboutMe = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateAboutMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-me-info'] })
    },
  })
}
