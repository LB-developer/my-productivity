import {
  faBook,
  faCalendar,
  faChartLine,
  faDiagramProject,
  faGear,
  faListCheck,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"

export default function Sidebar() {
  // TODO: replace navlinks to dynamic routes based on the user
  return (
    <div className="d-flex flex-column w-25 bg-light bg-opacity-75 p-5 gap-5">
      <div className="d-flex align-items-center">
        <NavLink to="/">
          <span>Productiv</span>
        </NavLink>
      </div>
      <nav className="global-nav">
        <ul className="d-flex flex-column gap-4 ps-0 align-items-start">
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faTableColumns} />
              <span className="nav-word">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faChartLine} />
              <span className="nav-word">Activity</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faBook} />
              <span className="nav-word">Courses</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faDiagramProject} />
              <span className="nav-word">Projects</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faListCheck} />
              <span className="nav-word">Tasks</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faCalendar} />
              <span className="nav-word">Schedule</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-2 align-items-center"
            >
              <FontAwesomeIcon icon={faGear} />
              <span className="nav-word">Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
