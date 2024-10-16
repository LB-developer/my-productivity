import { useEffect } from "react"
import { Button } from "react-bootstrap"

interface Props {
  studySessionTimeElapsed: Map<string, number>
  setStudySessionTimeElapsed: React.Dispatch<
    React.SetStateAction<Map<string, number>>
  >
  isRunning: boolean
}
export default function Stopwatch({
  studySessionTimeElapsed,
  setStudySessionTimeElapsed,
  isRunning,
}: Props) {
  /*
    Our useEffect adds 1 second/minute/hour based on the current time elapsed

    It works by incrementing time based on the current value  being less than 59
    else when
    60 seconds have passed - reset seconds to 0 and add one to minute
    60 minutes have passed - reset minutes to 0 and add one to hour
  */
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if ((studySessionTimeElapsed.get("seconds") ?? 0) < 59) {
          setStudySessionTimeElapsed((prevTime) => {
            const lastTime = new Map([...prevTime])
            // current seconds are less than 59 e.g. XX:XX:58 therefore it is safe to increment
            lastTime.set("seconds", (lastTime.get("seconds") ?? 0) + 1)

            return lastTime
          })
        } else if ((studySessionTimeElapsed.get("minutes") ?? 0) < 59) {
          setStudySessionTimeElapsed((prevTime) => {
            const lastTime = new Map([...prevTime])
            lastTime.set("minutes", (lastTime.get("minutes") ?? 0) + 1) // increment minutes passed by one
            lastTime.set("seconds", 0) // 60 seconds have passed - reset seconds to zero

            return lastTime
          })
        } else {
          setStudySessionTimeElapsed((prevTime) => {
            const lastTime = new Map([...prevTime])
            lastTime.set("hours", (lastTime.get("hours") ?? 0) + 1) // increment hours passed by one
            lastTime.set("minutes", 0) // 60 minutes have passed - reset minutes to zero
            lastTime.set("seconds", 0) // 60 seconds have passed - reset seconds to zero

            return lastTime
          })
        }
      }, 500) // TODO: when stopwatch is complete, change to 1000 for accurate counting
      return () => clearInterval(interval)
    }
  }, [isRunning, studySessionTimeElapsed, setStudySessionTimeElapsed])

  return (
    <Button
      variant="outline-primary"
      className="d-flex flex-row justify-content-center h-100"
      size="lg"
    >
      {Array.from(studySessionTimeElapsed.entries()).map(
        ([time, value], index) => {
          return (
            <div key={time}>
              <span>
                {/* print the stopwatch time as HH:MM:SS */}
                {String(value).padStart(2, "0")}
                {index < 2 && ":"}
              </span>
            </div>
          )
        }
      )}
    </Button>
  )
}
