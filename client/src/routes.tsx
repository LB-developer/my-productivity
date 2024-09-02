import { createRoutesFromElements, Route } from 'react-router-dom'

import EditAboutMe from '../components/EditAboutMe'
import EditProjects from '../components/EditProjects'
import HomePage from '../components/HomePage'
import MoreAboutMe from '../components/MoreAboutMe'
import Experience from '../components/Experience'
import MoreProjects from '../components/MoreProjects'
import App from '../components/App'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomePage />} />
    <Route path="/edit-about-me" element={<EditAboutMe />} />
    <Route path="/edit-projects" element={<EditProjects />} />
    <Route path="/more-about-me" element={<MoreAboutMe />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/more-projects" element={<MoreProjects />} />
  </Route>
)

export default routes
