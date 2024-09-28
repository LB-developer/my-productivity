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
