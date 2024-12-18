import { Project } from '../../client/models/portfolio.type'

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
