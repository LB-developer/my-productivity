import { Button, Tab, Table, Tabs } from "react-bootstrap";
import { useGetUserTasks } from "../hooks/Tasks/Tasks"
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { TaskData } from "../models/tasks.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import AddTask from "../components/AddTask"
import { useAuth } from "../src/store/ContextProvider";

const handleDueDate = (endDate: string) => {
  const secondsSince = Date.parse(endDate)

  const currDay = new Date().valueOf()
  const equation = currDay - secondsSince
  const timeToDeadline = Math.floor(equation / (1000 * 60 * 60) / 24) * -1
  return <td> <Button className={
    timeToDeadline >= 0
      ? timeToDeadline < 3
        ? "bg-warning bg-opacity-25 text-warning fw-bold border-0"
        : "bg-success bg-opacity-25 text-success  fw-bold border-0"
      : "bg-danger bg-opacity-25 text-danger fw-bold border-0"
  }> {timeToDeadline}  Days </Button> </td>
}

export default function Tasks() {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  if (loading || !user || !user.publicId) {
    return <p>Checking user info...</p>
  }

  const { data: tasks, isLoading, isError, error } = useGetUserTasks(user.publicId);

  const [taskSelector, setTaskSelector] = useState<number>(1);
  const [filter, setFilter] = useState<string>('none')

  const filteredTasks = useMemo(() => {
    if (tasks)
      return filter === 'none'
        ? tasks[taskSelector]
        : tasks[taskSelector]?.filter((task) => task.contextType.String === filter)
  }, [tasks, filter, taskSelector])

  // TODO: get data for names of unique courses for list
  // const courseNameList = ["Go Programming", "React Fundamentals", "View All"];


  if (isLoading) {
    // TODO: replace with loading page, spinner, something
    return <p>Loading Tasks...</p>
  }

  if (isError) {
    console.error(error);
    return <p>Something went wrong...</p>
  }


  return (
    <section className="m-4">
      <HelmetProvider>
        <Helmet>
          <title>Tasks</title>
        </Helmet>
        <section className="d-flex justify-content-between">
          <section className="">
            <p className="mb-0 ">Welcome to your,</p>
            <h2 className="fw-bold display-6 mt-0">Tasks</h2>
          </section>
          <AddTask contextType={null} contextId={null} parentTaskId={null} />
        </section>
        <Tabs onSelect={(k) => setTaskSelector(k ? +k : 1)} id="completion-tab-selector" defaultActiveKey={"incomplete"} >
          <Tab eventKey={1} title={"Incomplete"}></Tab>
          <Tab eventKey={0} title={"Complete"} ></Tab>
        </Tabs>
        {tasks
          ?
          <div className="" style={{ overflow: "auto", maxHeight: "75vh" }}>
            <Table className="mt-4" variant="dark" striped bordered hover>
              <thead style={{ position: "sticky", top: "0", zIndex: "1" }}>
                <tr>
                  <th className="">#</th>
                  <th className="">Task Name</th>
                  <th className="">Deadline</th>
                  <th className="">Category</th>
                  <th className="">Milestone</th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks?.map((task: TaskData) =>
                (
                  <tr key={task.taskId} >
                    <td>{task.taskId}</td>
                    <td >{task.taskName}</td>
                    {handleDueDate(task.deadline)}
                    <td>{task.contextType.Valid && task.contextType.String}</td>
                    <td>{task.milestoneId.Valid && task.milestoneId.Int64}</td>

                    <td
                      className="" role="button" tabIndex={0} onClick={() => navigate(`/tasks/${task.taskId}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate(`/tasks/${task.taskId}`);
                        }
                      }}><FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </td>

                  </tr>
                )
                )}
              </tbody>
            </Table>
          </div>
          : <Table className="mt-4" variant="dark" striped bordered hover>
            { /* User has no data to display so show an empty table */}
            <thead style={{ position: "sticky", top: "0", zIndex: "1" }}>
              <tr>
                <th className="">#</th>
                <th className="">Task Name</th>
                <th className="">Deadline</th>
                <th className="">Category</th>
                <th className="">Milestone</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>1</td>
                <td >Add a task to get started!</td>
                <td>{}</td>
                <td>{}</td>
                <td>{}</td>
              </tr>
            </tbody>
          </Table>
        }
      </HelmetProvider>
    </section >
  )
}


//                  <Dropdown>
//                    <Dropdown.Toggle variant="success" id="dropdown-basic">
//                      <FontAwesomeIcon icon={faFilter} />
//                    </Dropdown.Toggle>
//
//                    <Dropdown.Menu>
//                      {courseNameList.map((courseName, index) =>
//                        <Dropdown.Item key={`${index}${courseName}`} onClick={() => setTaskFilter(courseName)}>{courseName}</Dropdown.Item>
//                      )}
//                    </Dropdown.Menu>
//                  </Dropdown>

