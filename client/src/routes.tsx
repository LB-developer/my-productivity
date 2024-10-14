import { createRoutesFromElements, Route } from 'react-router-dom'

import App from '../components/App'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Tasks from '../Pages/Tasks.tsx'

export const routes = createRoutesFromElements(
        <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
        </Route>
)

export default routes
