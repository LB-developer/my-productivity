import { useQuery } from '@tanstack/react-query'
import { fetchAboutMe } from '../../api/clientapi/get'

const inputFields = {
  Name: 'first_name',
  Role: 'role',
  Location: 'location',
  Email: 'email_link',
  Github: 'github_acc_link',
  LinkedIn: 'linkedin_link',
  Picture: 'picture_url',
}

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

  type AboutMeKey = keyof typeof aboutMeData
  const createInputFields = (): JSX.Element[] | undefined => {
    if (aboutMeData)
      return Object.entries(inputFields).map((infoEl, index) => (
        <div key={`about-me-div ${index}`}>
          <p key={`about-me-p ${index}`}>{infoEl[0]}</p>
          <input
            type="text"
            name={infoEl[0]}
            key={`about-me-input ${index}`}
            defaultValue={aboutMeData[infoEl[1] as AboutMeKey]}
          />
        </div>
      ))
  }

  const handleRenderForm = () => {
    if (aboutMeData)
      return (
        <form>
          <fieldset>
            <label>{createInputFields()}</label>
          </fieldset>
        </form>
      )
  }

  {
    return <>{handleRenderForm()}</>
  }
}