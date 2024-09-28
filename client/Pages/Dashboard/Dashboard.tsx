import CoursesPreview from '../../components/Widgets/CoursesPreview'
import MonthlyHours from '../../components/Widgets/MonthlyHours'
import ActivityPreview from '../../components/Widgets/ActivityPreview'
import CurrentProgress from '../../components/Widgets/CurrentProgress'
import MonthlySpend from '../../components/Widgets/MonthlySpend'
import SchedulePreview from '../../components/Widgets/SchedulePreview'
import TotalSpend from '../../components/Widgets/TotalSpend'
import UserOverview from '../../components/Widgets/UserOverview'

export default function Dashboard() {
  const userId: number = 1

  return (
    <div className="grid grid-cols-11 grid-rows-8 gap-4  bg-slate-300 h-dvh">
      <div className="col-start-3 col-span-6 my-6">
        <p>Welcome to your,</p>
        <h2 className="font-extrabold text-5xl">Productivity Dashboard</h2>
      </div>
      <div className="bg-purple-400 col-start-3 col-span-3 row-start-2">
        <MonthlyHours />
      </div>
      <div className="bg-red-300 col-start-6 col-span-3 row-start-2">
        <MonthlySpend />
      </div>
      <div className="bg-purple-300 col-start-9 col-span-3 row-start-2">
        <TotalSpend />
      </div>
      <div className="bg-blue-400 col-start-3 col-span-3 row-start-3 row-span-3">
        <SchedulePreview />
      </div>
      <div className="bg-green-300 col-start-6 col-span-3 row-start-3 row-span-3">
        <CoursesPreview />
      </div>
      <div className="bg-pink-300 col-start-9 col-span-3 row-start-3 row-span-3">
        <ActivityPreview />
      </div>
      <div className="bg-teal-400 col-start-3 col-span-6 row-span-3">
        <CurrentProgress />
      </div>
      <div className="bg-amber-400 col-start-9 col-span-3 row-span-3">
        <UserOverview userId={userId} />
      </div>
    </div>
  )
}
