import { PersonalInfo } from '../models/portfolio.type'
import { useGetAboutMe, useUpdateAboutMe } from '../hooks/index'
import React from 'react'

const renderedInputFields = {
  Name: 'Name',
  Role: 'Role',
  Location: 'Location',
  Email: 'Email',
  Github: 'Github',
  Linkedin: 'Linkedin',
  Picture: 'Picture',
}

export default function EditAboutMe() {
  const { data: aboutMeData, isLoading, isError, error } = useGetAboutMe()
  const patchMutation = useUpdateAboutMe()

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
    patchMutation.mutateAsync(updatedInfo)
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
