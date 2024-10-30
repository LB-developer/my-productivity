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
  deadline: string
  taskName: string
  contextType: {
    String: number
    Valid: boolean
  }
  contextId: {
    Int64: number
    Valid: boolean
  }
  priority: number
  parentTaskId: {
    Int64: number
    Valid: boolean
  }
  milestoneId: {
    Int64: number
    Valid: boolean
  }
  estHoursToComplete: {
    Int64: number
    Valid: boolean
  }
  isCompleted: boolean
  inProgress: boolean
  createAt: string
  updatedAt: string
}

export interface CreatedTask {
  taskId: number
}
