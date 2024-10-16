import { Table } from "react-bootstrap";
import { useGetUserTasks } from "../hooks/Tasks/Tasks"
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";


export default function Tasks() {

  // TODO: replace "1" with dynamically attained userId
  const { data: tasks, isLoading, isError, error } = useGetUserTasks("1");

  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    console.error(error);
    return <p>Something went wrong...</p>
  }

  if (tasks) {
    return (
      <>
        <Helmet>
          <title>Tasks</title>
        </Helmet>
        <div className="d-flex flex-row">
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
                <tr role="button" tabIndex={0} onClick={() => navigate(`/tasks/${task.taskId}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/tasks/${task.taskId}`);
                    }
                  }}>
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
        </div>
      </>
    )
  }
}
