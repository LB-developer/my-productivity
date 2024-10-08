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
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if ((studySessionTimeElapsed.get("seconds") ?? 0) < 59) {
          setStudySessionTimeElapsed((prevTime) => {
            const lastTime = new Map([...prevTime])
            lastTime.set("seconds", (lastTime.get("seconds") ?? 0) + 1)

            return lastTime
          })
        } else if ((studySessionTimeElapsed.get("minutes") ?? 0) < 59) {
          setStudySessionTimeElapsed((prevTime) => {
            const lastTime = new Map([...prevTime])
            lastTime.set("minutes", (lastTime.get("minutes") ?? 0) + 1)
            lastTime.set("seconds", 0)

            return lastTime
          })
        } else {
          setStudySessionTimeElapsed((prevTime) => {
            const lastTime = new Map([...prevTime])
            lastTime.set("hours", (lastTime.get("hours") ?? 0) + 1)
            lastTime.set("minutes", 0)
            lastTime.set("seconds", 0)

            return lastTime
          })
        }
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isRunning, studySessionTimeElapsed, setStudySessionTimeElapsed])

  return (
    <Button className="d-flex flex-row justify-content-center h-100" size="lg">
      {Array.from(studySessionTimeElapsed.entries()).map(
        ([time, value], index) => {
          return (
            <div key={time}>
              <span>
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
