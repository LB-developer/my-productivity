import { createRoutesFromElements, Route } from 'react-router-dom'

import App from '../components/App'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Courses from '../Pages/Courses.tsx'
import Activity from '../Pages/Activity.tsx'
import Projects from '../Pages/Projects.tsx'
import Tasks from '../Pages/Tasks.tsx'
import Schedule from '../Pages/Schedule.tsx'
import Settings from '../Pages/Settings.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Dashboard />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/activity" element={<Activity />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/tasks" element={<Tasks />} />
    <Route path="/schedule" element={<Schedule />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
)

export default routes
