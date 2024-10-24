import { Button } from "react-bootstrap"
import { doSignOut } from "../../../src/firebase/AuthService"
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    doSignOut();
    navigate("/")
  }

  return (
    <Button className="justify-self-end" onClick={handleLogOut}>Sign Out</Button>
  )
}
