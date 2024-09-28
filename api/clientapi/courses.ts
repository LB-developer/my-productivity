import { UserHours } from './models'

export async function fetchTotalHoursCompleted(
  userId: number
): Promise<UserHours> {
  const res = await fetch(
    `http://localhost:8080/api/v1/courses/hours?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json())

  return res
}
