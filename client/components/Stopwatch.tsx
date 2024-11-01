import { Button } from "react-bootstrap"

interface Props {
  timeElapsed: number
}
export default function Stopwatch({
  timeElapsed,
}: Props) {

  const sec = timeElapsed % 60
  const min = Math.floor((timeElapsed % 3600) / 60)
  const hour = Math.floor(timeElapsed / 3600)
  const seconds = String(sec).padStart(2, "0")
  const minutes = String(min).padStart(2, "0")
  const hours = String(hour).padStart(2, "0")

  return (
    <Button
      variant="outline-primary"
      className="d-flex flex-row justify-content-center h-100"
      size="lg"
    >
      {`${hours}:${minutes}:${seconds}`}
    </Button>
  )
}
