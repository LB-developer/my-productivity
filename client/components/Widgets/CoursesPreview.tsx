import { Card, Placeholder } from 'react-bootstrap'
import { useGetCoursesPreview } from '../../hooks/Courses/useGetHours'
import { coursePreviewSkeleton } from './Skeletons'

interface Props {
  userId: string
}

export default function CoursesPreview({ userId }: Props) {
  const {
    data: threeCourses,
    isLoading,
    isError,
    error,
  } = useGetCoursesPreview(+userId)

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
      <div className="d-flex flex-column ps-3 pt-4 ms-1 h-100">
        <h3 className="mb-4 fs-4'">Your Courses</h3>
        {/* add seed data, add gap, return proper data */}
        <ul className="ps-0">
          {threeCourses.map((course) => (
            <div key={course.id} className="d-flex flex-row">
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
            </div>
          ))}
        </ul>

        <div className="d-flex flex-row justify-content-end fw-bold gap-2 pe-2 align-items-end text-primary h-100">
          <p>{'View all Courses '}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '1.5em' }}
            viewBox="0 0 512 512"
            className="mb-3"
          >
            <path
              fill="#0000FF"
              d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"
            />
          </svg>
        </div>
      </div>
    )
  }
}
