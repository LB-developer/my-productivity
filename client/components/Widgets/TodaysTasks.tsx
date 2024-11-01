import { Card } from "react-bootstrap"
import { useGetTodaysTasks } from "../../hooks/Schedule/Schedule"
import ViewAllButton from "../../components/Widgets/Buttons/ViewAllButton"

interface Props {
  publicUserId: string
}

export default function TodaysTasks({ publicUserId }: Props) {
  const { data: todaysTasks } = useGetTodaysTasks(publicUserId)

  if (todaysTasks)
    return (
      <section className="row pt-4 ms-1 h-100">
        <h3 className="mb-3 fs-3">Today's Tasks</h3>
        {/* add seed data, add gap, return proper data */}
        <ul className="pt-0">
          {todaysTasks.map((task) => (
            <section key={task.taskId} className="d-flex flex-row gap-2">
              <div
                className="bg-primary border-0 mt-2 gap-2"
                style={{ width: "0.3em", height: "2.5em" }}
              ></div>
              <Card className="mt-2">
                <Card.Body className="d-flex flex-column mb-0 pb-1 pt-1">
                  <Card.Title className="mb-0 fs-6 fw-bold mt-1">
                    {task.taskName}
                  </Card.Title>
                  <Card.Text className="fw-light">
                    {task.taskStudyLength}
                  </Card.Text>
                </Card.Body>
              </Card>
            </section>
          ))}
        </ul>
        <div className="d-flex justify-content-end">
          <ViewAllButton route={"tasks"} title={"Tasks"} />
        </div>
      </section>
    )
}
