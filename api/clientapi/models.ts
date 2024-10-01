export interface UserHours {
  totalHours: number
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