import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFloppyDisk,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import Stopwatch from "../Stopwatch"

const startingTime: Map<string, number> = new Map([
  ["hours", 0],
  ["minutes", 0],
  ["seconds", 0],
])

export default function NewStudySession() {
  const [studySessionTimeElapsed, setStudySessionTimeElapsed] =
    useState<Map<string, number>>(startingTime)
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const handleResetSession = () => {
    setStudySessionTimeElapsed(startingTime)
    setIsRunning(false)
  }

  return (
    <div className="d-flex flex-column gap-1 p-3">
      <h4>New Study Session</h4>
      <Stopwatch
        studySessionTimeElapsed={studySessionTimeElapsed}
        setStudySessionTimeElapsed={setStudySessionTimeElapsed}
        isRunning={isRunning}
      />
      {isRunning ? (
        <div className="d-flex flex-row justify-content-center gap-1">
          <Button
            variant="outline-primary"
            className="flex-grow-1"
            onClick={() => setIsRunning(false)}
          >
            <FontAwesomeIcon icon={faPause} />
          </Button>
          {/* TODO: Send user to task viewer */}
          <Button onClick={() => setIsRunning(false)}>
            Open in task viewer
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-row justify-content-center gap-1">
          {/* 
              If a session has been started and not 'stopped' (different from pause), 
              studySessionTimeElapsed will have a current value greater than one which we use
              to render the continue button.
              
              Should a user 'stop' the timer or save the current session as a task, 
              a task/session will be created with the current time as a value;
              all other values being default.
          */}
          {Math.max(...Array.from(studySessionTimeElapsed.values())) > 0 ? (
            <Button
              variant="outline-primary"
              className="w-100"
              onClick={() => setIsRunning(true)}
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          ) : (
            <Button
              className=""
              onClick={() => (
                setIsRunning(true), setStudySessionTimeElapsed(startingTime)
              )}
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          )}
          <Button
            variant="outline-primary"
            className=""
            onClick={handleResetSession}
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
