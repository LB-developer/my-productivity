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

export interface TodaysTasksData {
  taskId: number
  taskStudyLength: string
  taskName: string
  courseId: number
  courseName: string
  courseAuthor: string
}

export interface TaskData {
  taskId: number
  taskStudyLength: string
  taskStudyDate: string
  taskName: string
  courseId: number
  courseName: string
  courseAuthor: string
  courseLink: string
}
