import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '../../api/clientapi/get'
import { Project } from '../../client/types/project.type'

function HomePage() {
  const {
    data: projects,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await fetchProjects(),
  })

  if (isLoading) {
    return <p>Loading Projects...</p>
  }

  if (isError) {
    console.error(error)
    return <p>Error, please check console for more details</p>
  }

  if (projects)
    return (
      <>
        <p>Hello</p>
        <ul>
          {projects.map((project: Project) => {
            return (
              <>
                <li key={project.id}>{project.name}</li>
              </>
            )
          })}
        </ul>
      </>
    )
}

export default HomePage
