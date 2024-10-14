import { Table } from "react-bootstrap";
import { useGetUserTasks } from "../hooks/Tasks/Tasks"


export default function Tasks() {

  // TODO: replace "1" with dynamically attained userId
  const { data: tasks } = useGetUserTasks("1");

  if (tasks) {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Task Length</th>
            <th>Task Date</th>
            <th>Course Name</th>
          </tr>
        </thead>
        <tbody>
          {tasks[0].map(task =>
          (
            <tr>
              <td>{task.taskId}</td>
              <td>{task.taskName}</td>
              <td>{task.taskStudyLength}</td>
              <td>{task.taskStudyDate}</td>
              <td>{task.courseName}</td>
            </tr>
          )
          )}
        </tbody>
      </Table>
    )
  }
}
