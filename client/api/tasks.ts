import { DefaultTaskParameters } from "../hooks/Tasks/Tasks"
import { ThirtyHistoryLineGraph, TodaysTasksData, TaskData, CreatedTask } from "../models/tasks.type"

export async function fetchLastThirtyMinutes(
  publicUserId: string
): Promise<ThirtyHistoryLineGraph[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks/last-30?publicUserId=${publicUserId}`,
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
  publicUserId: string
): Promise<TodaysTasksData[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks/preview?publicUserId=${publicUserId}`,
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
  publicUserId: string
): Promise<TaskData[][]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks?publicUserId=${publicUserId}`,
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

export async function createNewTask({
  publicUserId,
  contextType,
  contextId,
  parentTaskId }: DefaultTaskParameters
): Promise<CreatedTask> {
  const res = await fetch(
    `http://localhost:8080/api/v1/tasks/create-task?publicUserId=${publicUserId}`,
    {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contextType, contextId, parentTaskId })
    }
  )
  const contentType = res.headers.get("Content-Type")
  if (!res.ok || !contentType?.includes("application/json")) {
    const err = await res.text()
    console.error("Error:", err)
    throw new Error("Failed to create a new task")
  }

  return res.json()
}

