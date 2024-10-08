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
    <div className="d-flex flex-column gap-2">
      <h4>New Study Session</h4>
      <Stopwatch
        studySessionTimeElapsed={studySessionTimeElapsed}
        setStudySessionTimeElapsed={setStudySessionTimeElapsed}
        isRunning={isRunning}
      />
      {isRunning ? (
        <>
          <Button className="w-100" onClick={() => setIsRunning(false)}>
            <FontAwesomeIcon icon={faPause} />
          </Button>

          <Button onClick={() => setIsRunning(false)}>
            Open in task viewer
          </Button>
        </>
      ) : (
        <div className="d-flex justify-content-between">
          {/* 
              If a session has been started and not 'stopped' (different from pause), 
              studySessionTimeElapsed will have a current value greater than one which we use
              to render the continue button.
              
              Should a user 'stop' the timer or save the current session as a task, 
              a task/session will be created with the current time as a value;
              all other values being default.
          */}
          {Math.max(...Array.from(studySessionTimeElapsed.values())) > 0 ? (
            <Button className="w-100" onClick={() => setIsRunning(true)}>
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          ) : (
            <Button
              className="w-100"
              onClick={() => (
                setIsRunning(true), setStudySessionTimeElapsed(startingTime)
              )}
            >
              <FontAwesomeIcon icon={faPlay} />
            </Button>
          )}
          <Button className="w-100" onClick={handleResetSession}>
            Reset
          </Button>
          <Button>
            <FontAwesomeIcon icon={faFloppyDisk} />
          </Button>
        </div>
      )}
    </div>
  )
}
