import { Course } from "../models/courses.type"

// Gets a max 3 courses of a user
export async function fetchCoursesPreview(publicUserId: string): Promise<Course[]> {
  const res = await fetch(
    `http://localhost:8080/api/v1/courses/preview?publicUserId=${publicUserId}`,
    {
      method: "GET",
    }
  ).then((response) => response.json())

  return res
}
