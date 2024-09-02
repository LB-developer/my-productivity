import { useQuery } from '@tanstack/react-query'
import { fetchProjects } from '../../api/clientapi/projects'
import { Project } from '../models/portfolio.type'

export default function Projects() {
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
        <div className="projects-container">
          <p>Projects ↓</p>
          <div className="projects-overview-showcase">
            {projects.map((project: Project) => {
              return <li key={project.id}>{project.name}</li>
            })}
          </div>
        </div>
      </>
    )
}
