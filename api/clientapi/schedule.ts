import { SchedulePreviewData } from './models'
export async function fetchSchedulePreview(
  userId: string
): Promise<SchedulePreviewData[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/schedules/preview?userId=${userId}`,
    {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    }
  )
  const contentType = res.headers.get('Content-Type')
  if (!res.ok || !contentType?.includes('application/json')) {
    const err = await res.text()
    console.error('Error:', err)
    throw new Error('Failed to fetch projects. Response was not JSON.')
  }

  return res.json()
}
