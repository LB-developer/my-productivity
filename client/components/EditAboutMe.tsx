import { PersonalInfo } from '../models/portfolio.type'
import { useGetAboutMe, useUpdateAboutMe } from '../hooks/index'
import React from 'react'
import SearchTechnologies from './SearchTechnologies'

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
  const handleSubmitChanges = (event: React.FormEvent<HTMLFormElement>) => {
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
        <div className="about-me-form-group" key={`about-me-div ${index}`}>
          <p className="about-me-form-title" key={`about-me-p ${index}`}>
            {infoEl[0]}
          </p>
          <input
            className="about-me-form-input"
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
      <>
        <form onSubmit={async (e) => await handleSubmitChanges(e)}>
          <fieldset className="about-me-form-fieldset">
            <label>{createInputFields()}</label>
            <button className="button-10" type="submit">
              Submit Changes
            </button>
          </fieldset>
        </form>
      </>
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
    return (
      <div className="edit-about-me-container">
        <h1 className="edit-about-me-heading">Edit About Me</h1>
        {handleRenderForm()}
        <SearchTechnologies />
      </div>
    )
  }
}
