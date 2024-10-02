import { Course, UserHours } from './models'

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

// Gets a max 3 courses of a user
export async function fetchCoursesPreview(userId: number): Promise<Course[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/courses/preview?userId=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json())

  return res
}
