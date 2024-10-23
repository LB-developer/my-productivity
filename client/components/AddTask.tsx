import { Button } from "react-bootstrap"
import { useCreateNewTask } from "../hooks/Tasks/Tasks"
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const mutate = useCreateNewTask("1");
  const navigate = useNavigate();

  const handleCreateTask = async () => {
    // TODO: change "1" to dynamic value based on the user
    const { taskId } = await mutate.mutateAsync("1")
    navigate(`/tasks/${taskId}`)
  }

  return (
    <Button onClick={handleCreateTask}>Add Task</Button>
  )

}
