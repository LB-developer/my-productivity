import { UserWidgetInfo } from './models'

export async function fetchUserWidgetInfo(
  userId: number
): Promise<UserWidgetInfo> {
  const res = await fetch(
    `http://localhost:8080/api/v1/users/info?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json())

  return res
}
