import { createRoutesFromElements, Route } from 'react-router-dom'

import EditAboutMe from '../components/EditAboutMe'
import EditProjects from '../components/EditProjects'
import HomePage from '../components/HomePage'
import App from '../components/App'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomePage />} />
    <Route path="/edit-about-me" element={<EditAboutMe />} />
    <Route path="/edit-projects" element={<EditProjects />} />
  </Route>
)

export default routes
