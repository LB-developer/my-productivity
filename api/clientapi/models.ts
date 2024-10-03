export interface UserWidgetInfo {
  coursesCount: number
  projectsCount: number
  totalHoursCompleted: number
}

export interface LineCoordinates {
  x: string
  y: number
}

export interface ThirtyHistoryLineGraph {
  id: string
  color: string
  data: LineCoordinates[]
}

export interface SchedulePreviewData {
  taskId: number
  taskStudyLength: string
  taskName: string
  courseId: number
  courseName: string
  courseAuthor: string
}

export interface Course {
  id: number
  userId: number
  name: string
  price: string
  author: string
  link: string
  hoursToComplete: string
  hoursCompleted: string
}
