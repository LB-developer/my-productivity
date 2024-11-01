import { useGetUserWidgetInfo } from '../../hooks/Users'

interface Props {
  publicUserId: string
}

export default function UserOverview({ publicUserId }: Props) {
  const { data: info } = useGetUserWidgetInfo(publicUserId)

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
