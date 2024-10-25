import { Dropdown, Table } from "react-bootstrap";
import { useGetUserTasks } from "../hooks/Tasks/Tasks"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TaskData } from "../models/tasks.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import AddTask from "../components/AddTask"
import { useAuth } from "../src/store/ContextProvider";

const handleDueDate = (endDate: string) => {
  const secondsSince = Date.parse(endDate)

  const currDay = new Date().valueOf()
  let equation = currDay - secondsSince
  return <td> {Math.floor(equation / (1000 * 60 * 60))} | {endDate} </td>
}

export default function Tasks() {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  if (loading || !user || !user.publicId) {
    return <p>Checking user info...</p>
  }

  const { data: tasks, isLoading, isError, error } = useGetUserTasks(user.publicId);


  // TODO: get data for names of unique courses for list
  const courseNameList = ["Go Programming", "React Fundamentals", "View All"];

  const [incompleteTaskList, setIncompleteTaskList] = useState<TaskData[]>();
  const [taskFilter, setTaskFilter] = useState<string>("View All");


  // initialize incomplete task into state variable when data is fetched
  useEffect(() => {
    if (tasks)
      setIncompleteTaskList(tasks[1])
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
        <AddTask />
        <div className="" style={{ overflow: "auto", height: "75vh", maxWidth: "75vw" }}>
          <Table striped bordered hover>
            <thead style={{ position: "sticky", top: "0", zIndex: "1" }}>
              <tr>
                <th className="">#</th>
                <th className="">Task Name</th>
                <th className="">Task Length</th>
                <th className="">Task Date</th>
                <th className="d-flex gap-3 align-items-center">Course Name
                  <Dropdown>
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
                  {handleDueDate(task.taskStudyDate)}
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
