export async function fetchTechnologies() {
  const res = await fetch(
    'http://localhost:8080/api/v1/about-me/technologies',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const contentType = res.headers.get('Content-Type')
  if (!res.ok || !contentType?.includes('application/json')) {
    const err = await res.text()
    console.error('Error:', err)
    throw new Error('Failed to fetch info. Response was not JSON.')
  }

  return res.json()
}
