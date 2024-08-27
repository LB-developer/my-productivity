import { PersonalInfo } from '../../client/models/portfolio.type'

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

export async function updateAboutMe(updatedInfo: PersonalInfo) {
  const res = await fetch('http://localhost:8080/api/v1/about-me', {
    method: 'PATCH',
    body: JSON.stringify(updatedInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())

  return res
}
