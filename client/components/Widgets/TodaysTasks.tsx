import { Card } from "react-bootstrap"
import { useGetTodaysTasks } from "../../hooks/Schedule/Schedule"

interface Props {
  userId: string
}

export default function TodaysTasks({ userId }: Props) {
  const { data: todaysTasks } = useGetTodaysTasks(userId)

  if (todaysTasks)
    return (
      <div className="row pt-4 ms-1 h-100">
        <h2 className="mb-3 fs-3">Today's Tasks</h2>
        {/* add seed data, add gap, return proper data */}
        <ul className="pt-0">
          {todaysTasks.map((task) => (
            <div key={task.taskId} className="d-flex flex-row">
              <div
                className="bg-primary border-0 mt-2 ms-1"
                style={{ width: "0.3em", height: "2.5em" }}
              ></div>
              <Card border="light" bg={"light"} text={"dark"} className="">
                <Card.Body className="d-flex flex-column mb-0 pb-1 pt-1">
                  <Card.Title className="mb-0 fs-6 fw-bold mt-1">
                    {task.taskName}
                  </Card.Title>
                  <Card.Text className="fw-light">
                    {task.taskStudyLength}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </ul>
        <div className="d-flex flex-row justify-content-end fw-bold gap-2 pe-4 text-primary align-items-end ">
          <p>{"View all Tasks "}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mb-3"
            style={{ width: "1.5em" }}
            viewBox="0 0 512 512"
          >
            <path
              fill="#0000FF"
              d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
            />
          </svg>
        </div>
      </div>
    )
}
