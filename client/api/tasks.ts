import { ThirtyHistoryLineGraph } from "./models"
import { TodaysTasksData, TaskData } from "./models"

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
  )
  const contentType = res.headers.get("Content-Type")
  if (!res.ok || !contentType?.includes("application/json")) {
    const err = await res.text()
    console.error("Error:", err)
    throw new Error("Failed to fetch completed hours in the last 30 days. Response was not JSON.")
  }

  return res.json()
}

export async function fetchTodaysTasks(
  userId: string
): Promise<TodaysTasksData[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks/preview?userId=${userId}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  )
  const contentType = res.headers.get("Content-Type")
  if (!res.ok || !contentType?.includes("application/json")) {
    const err = await res.text()
    console.error("Error:", err)
    throw new Error("Failed to fetch todays tasks. Response was not JSON.")
  }

  return res.json()
}


export async function fetchAllTasks(
  userId: string
): Promise<TaskData[][]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks?userId=${userId}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    }
  )
  const contentType = res.headers.get("Content-Type")
  if (!res.ok || !contentType?.includes("application/json")) {
    const err = await res.text()
    console.error("Error:", err)
    throw new Error("Failed to fetch tasks. Response was not JSON.")
  }

  return res.json()
}
