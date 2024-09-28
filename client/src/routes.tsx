import { createRoutesFromElements, Route } from 'react-router-dom'

import App from '../components/App'
import Dashboard from '../Pages/Dashboard/Dashboard'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Dashboard />} />
  </Route>
)

export default routes
