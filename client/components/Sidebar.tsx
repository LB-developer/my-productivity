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
import { Nav, NavItem } from "react-bootstrap"
import { NavLink, } from "react-router-dom"

const navPosition = "nav-link d-flex flex-row gap-3 align-items-center"
const activeLink = "nav-word text-primary"
const inactiveLink = "nav-word text-dark text-opacity-25"

export default function Sidebar() {

  // className="nav-link d-flex flex-row gap-3 align-items-center"
  // TODO: replace navlinks to dynamic routes based on the user
  return (
    <div className="d-flex flex-column w-25 bg-light bg-opacity-75 p-5 gap-5">
      <div className="d-flex align-items-center">
        <NavLink to="/">
          <span>Productiv</span>
        </NavLink>
      </div>
      <Nav className="global-nav">
        <ul className="fw-bold d-flex flex-column gap-2 ps-0 align-items-start">
          <NavItem>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className=" fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faTableColumns}
              />
              <span className="fs-5">
                Dashboard
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/activity"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faChartLine}
              />
              <span className="fs-5 ">
                Activity
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/courses"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faBook}
              />
              <span className="fs-5">
                Courses
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/projects"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faDiagramProject}
              />
              <span className="fs-5">
                Projects
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to={"/tasks"}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faListCheck}
              />
              <span className="fs-5">
                Tasks
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/schedule"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faCalendar}
              />
              <span className="fs-5">
                Schedule
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${navPosition} ${activeLink}` : `${navPosition} ${inactiveLink}`
              }
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faGear}
              />
              <span className="fs-5">
                Settings
              </span>
            </NavLink>
          </NavItem>
        </ul>
      </Nav>
    </div>
  )
}
