import { Button } from "react-bootstrap"
import { useCreateNewTask } from "../hooks/Tasks/Tasks"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/store/ContextProvider";

interface Props {
  contextType: string | null
  contextId: number | null
  parentTaskId: number | null
}

export default function AddTask({ contextType, contextId, parentTaskId }: Props) {
  const auth = useAuth();
  if (!auth || !auth.user?.publicId) return <p>Checking user data...</p>
  const mutate = useCreateNewTask();
  // const navigate = useNavigate();

  const handleCreateTask = async () => {
    if (auth.user && auth.user.publicId) {
      try {
        const publicUserId = auth.user.publicId
        const { taskId } = await mutate.mutateAsync({
          publicUserId,
          contextType,
          contextId,
          parentTaskId
        })
        // navigate(`/tasks/${taskId}`)
      } catch (error) {
        console.error("Failed to create task");
      }
    }
  }

  return (
    <Button onClick={handleCreateTask}>Add Task</Button>
  )

}
