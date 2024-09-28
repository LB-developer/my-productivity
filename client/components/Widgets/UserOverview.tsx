import { useGetTotalHoursCompleted } from '../../hooks/Courses/useGetHours'

interface Props {
  userId: number
}

export default function UserOverview({ userId }: Props) {
  const { data: hours } = useGetTotalHoursCompleted(userId)

  if (hours)
    return (
      <div className="bg-orange-400">
        <p>USER OVERVIEW</p>
        <p>Hours Completed:{hours.totalHours}</p>
      </div>
    )
}
