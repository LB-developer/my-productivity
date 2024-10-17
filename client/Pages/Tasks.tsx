import { Dropdown, Table } from "react-bootstrap";
import { useGetUserTasks } from "../hooks/Tasks/Tasks"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TaskData } from "../api/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";


export default function Tasks() {

  // TODO: replace "1" with dynamically attained userId
  const { data: tasks, isLoading, isError, error } = useGetUserTasks("1");

  // TODO: get data for names of unique courses for list
  const courseNameList = ["Go Programming", "React Fundamentals", "View All"];

  const [incompleteTaskList, setIncompleteTaskList] = useState<TaskData[]>();
  const [taskFilter, setTaskFilter] = useState<string>("View All");

  const navigate = useNavigate();

  // initialize incomplete task into state variable when data is fetched
  useEffect(() => {
    if (tasks)
      setIncompleteTaskList(tasks[0])
  }, [tasks])

  // filter tasks by course name
  useEffect(() => {
    if (tasks && incompleteTaskList && taskFilter !== "View All") {
      let currentOrder = [...tasks[1]].filter(task => task.courseName === taskFilter)
      setIncompleteTaskList(currentOrder);

    } else {
      if (tasks) {
        // options to filter are a list of course names or "View all"
        // -- this is the view all path
        setIncompleteTaskList(tasks[1])
      }
    }


  }, [taskFilter])

  if (isLoading) {
    // TODO: replace with loading page, spinner, something
    return <p>Loading Tasks...</p>
  }

  if (isError) {
    console.error(error);
    return <p>Something went wrong...</p>
  }

  if (incompleteTaskList) {
    return (
      <HelmetProvider>
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
                <th>Course Name<Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faFilter} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {courseNameList.map((courseName, index) =>
                      <Dropdown.Item key={`${index}${courseName}`} onClick={() => setTaskFilter(courseName)}>{courseName}</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                </th>
              </tr>
            </thead>
            <tbody>
              {incompleteTaskList.map(task =>
              (
                <tr key={task.taskId} role="button" tabIndex={0} onClick={() => navigate(`/tasks/${task.taskId}`)}
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
      </HelmetProvider>
    )
  }
}
