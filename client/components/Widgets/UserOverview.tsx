import { useGetUserWidgetInfo } from '../../hooks/Users'

interface Props {
  userId: number
}

export default function UserOverview({ userId }: Props) {
  const { data: info } = useGetUserWidgetInfo(userId)

  if (info)
    return (
      <div className="bg-orange-400">
        <p>USER OVERVIEW</p>
        <p>Hours Completed: {info.totalHoursCompleted}</p>
        <p>Courses Count: {info.coursesCount}</p>
        <p>Projects Count: {info.projectsCount}</p>
      </div>
    )
}
