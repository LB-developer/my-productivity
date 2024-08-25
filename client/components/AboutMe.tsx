import { useQuery } from '@tanstack/react-query'
import { fetchAboutMe } from '../../api/clientapi/get'

export default function AboutMe() {
  const {
    data: aboutMeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['about-me-info'],
    queryFn: fetchAboutMe,
  })

  if (isLoading) {
    return <p>Loading About Me...</p>
  }

  if (isError) {
    console.error(error)
    return <p>There was an error, please check the console for more info</p>
  }

  if (aboutMeData) {
    return (
      <>
        <div>
          <p>{aboutMeData.first_name}</p>
          <p>{aboutMeData.last_name}</p>
          <p>{aboutMeData.role}</p>
          <p>{aboutMeData.location}</p>
          <p>{aboutMeData.email_link}</p>
          <p>{aboutMeData.github_acc_link}</p>
          <p>{aboutMeData.linkedin_link}</p>
          <p>{aboutMeData.picture_url}</p>
          <p>{aboutMeData.fav_technologies}</p>
        </div>
      </>
    )
  }
}
