import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
function App() {
  return (
    <div className="app-container d-flex flex-row">
      <Sidebar />
      <div className="content-area">
        <Outlet />
      </div>
    </div>
  )
}

export default App
