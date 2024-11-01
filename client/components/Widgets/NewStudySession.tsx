import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFloppyDisk,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import Stopwatch from "../Stopwatch"


export default function NewStudySession() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  let intervalRef = useRef<ReturnType<typeof setInterval>>()

  const handleStart = () => {
    if (isRunning) return
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeElapsed((curr) => curr + 1)
    }, 1000)
  }

  const handleStop = () => {
    if (!isRunning) return
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }

  const handleReset = () => {
    setTimeElapsed(0)
    setIsRunning(false)
  }

  return (
    <div className="d-flex flex-column gap-1 p-3">
      <h4>New Focus Session</h4>
      <Stopwatch
        timeElapsed={timeElapsed}
      />
      {isRunning ? (
        <div className="d-flex flex-row justify-content-center gap-1">
          <Button
            variant="outline-primary"
            className="flex-grow-1"
            onClick={handleStop}
          >
            <FontAwesomeIcon icon={faPause} />
          </Button>
          {/* TODO: Send user to session viewer */}
          <Button >
            Open in session viewer
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-center gap-1">
          {/* The clock is not running */}
          {(
            <Button
              className=""
              onClick={handleStart}
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          )}
          <Button
            variant="outline-primary"
            className=""
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button variant="outline-primary">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </div>
      )}
    </div>
  )
}
