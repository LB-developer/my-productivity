import { PersonalInfo, Project } from '../../client/types/portfolio.type'

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('http://localhost:8080/api/v1/projects', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const contentType = res.headers.get('Content-Type')
  if (!res.ok || !contentType?.includes('application/json')) {
    const err = await res.text() // Log the HTML res
    console.error('Error:', err)
    throw new Error('Failed to fetch projects. Response was not JSON.')
  }

  return res.json()
}

export async function fetchAboutMe(): Promise<PersonalInfo> {
  const res = await fetch('http://localhost:8080/api/v1/about-me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const contentType = res.headers.get('Content-Type')
  if (!res.ok || !contentType?.includes('application/json')) {
    const err = await res.text()
    console.error('Error:', err)
    throw new Error('Failed to fetch info. Response was not JSON.')
  }

  return res.json()
}
