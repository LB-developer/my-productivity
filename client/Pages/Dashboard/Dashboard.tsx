import CoursesPreview from '../../components/Widgets/CoursesPreview'
import MonthlyHours from '../../components/Widgets/MonthlyHours'
import ActivityPreview from '../../components/Widgets/ActivityPreview'
import CurrentProgress from '../../components/Widgets/CurrentProgress'
import MonthlySpend from '../../components/Widgets/MonthlySpend'
import SchedulePreview from '../../components/Widgets/SchedulePreview'
import TotalSpend from '../../components/Widgets/TotalSpend'
import UserOverview from '../../components/Widgets/UserOverview'
import { Container, Row, Col } from 'react-bootstrap'

export default function Dashboard() {
  const userId: number = 1

  return (
    <Container fluid className="bg-secondary bg-opacity-25 min-vh-100">
      <Row className="gap-3 gy-3">
        {/* Header Section */}
        <Col
          xs={10}
          className="offset-2 d-flex flex-column justify-content-center"
        >
          <p className="mb-0 mt-4">Welcome to your,</p>
          <h2 className="fw-bold display-4">Productivity Dashboard</h2>
        </Col>

        <Col xs={3} className="offset-2 bg-light rounded-4">
          <MonthlyHours userId={String(userId)} />
        </Col>

        <Col xs={3} className="bg-danger bg-opacity-50">
          <MonthlySpend />
        </Col>

        <Col xs={3} className="bg-primary bg-opacity-25">
          <TotalSpend />
        </Col>

        <Col xs={3} className="offset-2 bg-light rounded-4">
          <SchedulePreview userId={String(userId)} />
        </Col>

        <Col xs={3} className="bg-success bg-opacity-50">
          <CoursesPreview />
        </Col>

        <Col xs={3} className="bg-warning bg-opacity-50">
          <ActivityPreview />
        </Col>

        <Col xs={6} className="offset-2 bg-primary bg-opacity-50">
          <CurrentProgress />
        </Col>

        <Col xs={3} className="bg-warning bg-opacity-75">
          <UserOverview userId={userId} />
        </Col>
      </Row>
    </Container>
  )
};

