import { NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav className="global-nav">
      <div className="logo">
        <NavLink to="/">
          <span>LB</span>
        </NavLink>
      </div>
      <div className="global-nav-routes">
        <NavLink to="/more-about-me" className="nav-link">
          <p>
            <strong className="nav-highlight">/</strong>{' '}
            <span className="nav-word">About</span>
          </p>
        </NavLink>
        <NavLink to="/experience" className="nav-link">
          <p>
            <strong className="nav-highlight">/</strong>{' '}
            <span className="nav-word">Experience</span>
          </p>
        </NavLink>
        <NavLink to="/more-projects" className="nav-link">
          <p>
            <strong className="nav-highlight">/</strong>{' '}
            <span className="nav-word">Projects</span>
          </p>
        </NavLink>
      </div>
    </nav>
  )
}
