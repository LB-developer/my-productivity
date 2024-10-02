import { ThirtyHistoryLineGraph, UserHours } from "./models"

export async function fetchLastThirtyMinutes(
  userId: string
): Promise<ThirtyHistoryLineGraph[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks/last-30?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json())

  return res
}

export async function fetchTotalHoursCompleted(
  userId: number
): Promise<UserHours> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks/hours-completed?userId=${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json())

  return res
}
