import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchAboutMe, updateAboutMe } from '../../api/clientapi/aboutme'
import { PersonalInfo } from '../models/portfolio.type'

const renderedInputFields = {
  Name: 'Name',
  Role: 'Role',
  Location: 'Location',
  Email: 'Email',
  Github: 'Github',
  Linkedin: 'Linkedin',
  Picture: 'Picture',
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

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: updateAboutMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-me-info'] })
    },
  })

  type PersonalInfoKey = keyof PersonalInfo
  const handleSubmitChanges = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const updatedInfo: PersonalInfo = {} as PersonalInfo
    const formData = new FormData(event.currentTarget)

    for (const [key, value] of formData.entries()) {
      const typedKey = key as PersonalInfoKey
      if (typeof value === 'string') {
        updatedInfo[typedKey] = value as never
      }
    }
    mutation.mutateAsync(updatedInfo)
  }

  type AboutMeKey = keyof typeof aboutMeData
  const createInputFields = (): JSX.Element[] | undefined => {
    if (aboutMeData)
      return Object.entries(renderedInputFields).map((infoEl, index) => (
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
    return (
      <form onSubmit={(e) => handleSubmitChanges(e)}>
        <fieldset>
          <label>{createInputFields()}</label>
          <button type="submit">Submit Changes</button>
        </fieldset>
      </form>
    )
  }

  if (isLoading) {
    return <p>Loading About Me...</p>
  }

  if (isError) {
    console.error(error)
    return <p>There was an error, please check the console for more info</p>
  }

  {
    return <>{handleRenderForm()}</>
  }
}
