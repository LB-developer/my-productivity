import { Button } from "react-bootstrap"
import { useCreateNewTask } from "../hooks/Tasks/Tasks"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/store/ContextProvider";

export default function AddTask() {
  const auth = useAuth();
  if (!auth.user) return <p>Please log in.</p>
  const mutate = useCreateNewTask(auth.user.publicId);
  const navigate = useNavigate();

  const handleCreateTask = async () => {
    if (auth.user) {
      const { taskId } = await mutate.mutateAsync(auth.user.publicId)
      navigate(`/tasks/${taskId}`)
    }
  }

  return (
    <Button onClick={handleCreateTask}>Add Task</Button>
  )

}
