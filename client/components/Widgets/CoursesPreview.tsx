import { Card, Placeholder } from 'react-bootstrap'
import { useGetCoursesPreview } from '../../hooks/Courses/useGetHours'
import { coursePreviewSkeleton } from './Skeletons'
import ViewAllButton from './Buttons/ViewAllButton'

interface Props {
  publicUserId: string
}

export default function CoursesPreview({ publicUserId }: Props) {
  const {
    data: threeCourses,
    isLoading,
    isError,
    error,
  } = useGetCoursesPreview(publicUserId)

  if (isError) {
    console.error(error)
  }

  // render skeleton components when data is loading
  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-between pt-4 ps-3 ms-1 h-100">
        <h3 className="fs-4'">Your Courses</h3>
        {/* add seed data, add gap, return proper data */}
        <ul className="d-flex flex-column justify-content-start ps-0">
          {Array(3)
            .fill(null)
            .map((_, i) => coursePreviewSkeleton(i))}
        </ul>
        <div className="fw-bold gap-2 pe-4 text-primary">
          <p>
            <Placeholder
              xs={12}
              className={'mb-3'}
              style={{ width: '40%', float: 'right' }}
            />
          </p>
        </div>
      </div>
    )
  }

  if (threeCourses) {
    return (
      <section className="d-flex flex-column ps-3 pt-4 ms-1 h-100">
        <h3 className="mb-4 fs-4'">Your Courses</h3>
        <ul className="ps-0">
          {threeCourses.map((course) => (
            <section key={course.id} className="d-flex flex-row">
              <Card.Img
                src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                alt="Card image"
                className="rounded-circle img-thumbnail w-25 h-25"
                style={{ maxWidth: '50px', justifySelf: 'flex-end' }}
              />
              <Card border="light" bg={'light'} text={'dark'} className="">
                <Card.Body className="d-flex flex-column mb-0 pb-1 pt-1">
                  <Card.Title className="mb-0 fs-6 fw-bold mt-1">
                    {course.name}
                  </Card.Title>
                  <Card.Text className="fw-light">{course.author}</Card.Text>
                </Card.Body>
              </Card>
            </section>
          ))}
        </ul>
        <div className="d-flex justify-content-end pb-2">
          <ViewAllButton route={"courses"} title={"Courses"} />
        </div>
      </section>
    )
  }
}
