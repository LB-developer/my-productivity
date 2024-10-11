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
// import { useState } from "react"
import { Nav, NavItem } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export default function Sidebar() {
  // const [currentPage, setCurrentPage] = useState("")

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
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faTableColumns}
              />
              <span className="nav-word fs-5 text-dark text-dark">
                Dashboard
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faChartLine}
              />
              <span className="nav-word fs-5 text-dark  fw-medium text-opacity-25 ">
                Activity
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faBook}
              />
              <span className="nav-word fs-5 fw-medium text-dark text-opacity-50">
                Courses
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faDiagramProject}
              />
              <span className="nav-word fs-5 fw-normal text-dark">
                Projects
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faListCheck}
              />
              <span className="nav-word fs-5 fw-normal text-dark">Tasks</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faCalendar}
              />
              <span className="nav-word fs-5 fw-normal text-dark">
                Schedule
              </span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/"
              className="nav-link d-flex flex-row gap-3 align-items-center"
            >
              <FontAwesomeIcon
                className="fa-fw me-2"
                style={{ maxWidth: "1.5rem" }}
                icon={faGear}
              />
              <span className="nav-word fs-5 fw-normal text-dark">
                Settings
              </span>
            </NavLink>
          </NavItem>
        </ul>
      </Nav>
    </div>
  )
}
