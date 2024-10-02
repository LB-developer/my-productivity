import { Card, Placeholder } from 'react-bootstrap'

export const coursePreviewSkeleton = (keyFromIndex: number): JSX.Element => {
  return (
    <div key={keyFromIndex} className="d-flex">
      <Card
        style={{ width: '18rem', border: 'none' }}
        className="d-flex flex-row bg-light align-items-center"
      >
        <Card.Img
          className="rounded-circle img-thumbnail m-0"
          src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          style={{ maxWidth: '50px', minHeight: '50px' }}
        />
        <Card.Body className="bg-light pt-4">
          <Placeholder
            as={Card.Title}
            className="mb-0 fs-6 fw-bold"
            animation="glow"
          >
            <Placeholder xs={2} /> <Placeholder xs={5} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow" className={'bg-light'}>
            <Placeholder size="xs" xs={4} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  )
}
