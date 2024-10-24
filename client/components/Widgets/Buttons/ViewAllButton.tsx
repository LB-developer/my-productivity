import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string
  route: string
}

export default function ViewAllButton({ title, route }: Props) {
  const navigate = useNavigate();

  return (
    <Button
      variant="link"
      className="d-inline-flex flex-row w-auto fw-bold gap-2 pe-2 text-primary border-0 p-0 mb-2"
      onClick={() => navigate(`/${route}`)}
    >
      <p className="mb-0 align-self-center ">View all {title}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "1.5em" }}
        viewBox="0 0 512 512"
      >
        <path
          fill="#0000FF"
          d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
        />
      </svg>
    </Button>)

}
