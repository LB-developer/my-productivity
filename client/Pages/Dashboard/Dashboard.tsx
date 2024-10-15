import CoursesPreview from "../../components/Widgets/CoursesPreview"
import MonthlyHours from "../../components/Widgets/MonthlyHours"
import ActivityPreview from "../../components/Widgets/ActivityPreview"
import CurrentProgress from "../../components/Widgets/CurrentProgress"
import MonthlySpend from "../../components/Widgets/MonthlySpend"
import TodaysTasks from "../../components/Widgets/TodaysTasks"
import NewStudySession from "../../components/Widgets/NewStudySession"
import UserOverview from "../../components/Widgets/UserOverview"
import { Container, Row, Col } from "react-bootstrap"

export default function Dashboard() {
  const userId: number = 1

  return (
    <div className="d-flex flex-row gap-2 bg-secondary bg-opacity-25">
      <Container fluid className="bg-secondary bg-opacity-10 min-vh-100">
        <Col className="flex-grow-1"></Col>
        <Row className="gap-3 gy-2">
          <Row className="gap-3 gy-2">
            {/* Header Section */}
            <Col xs={12} className="d-flex flex-column justify-content-center">
              <p className="mb-0 mt-4">Welcome to your,</p>
              <h2 className="fw-bold display-4">Productivity Dashboard</h2>
            </Col>
            <Col className="bg-light rounded-4">
              <MonthlyHours userId={String(userId)} />
            </Col>

            <Col className="bg-danger bg-opacity-50">
              <MonthlySpend />
            </Col>

            <Col className="bg-light rounded-4">
              <NewStudySession />
            </Col>
          </Row>
          <Row className="gap-3 gy-2">
            <Col className="bg-light rounded-4">
              <TodaysTasks userId={String(userId)} />
            </Col>

            <Col className="bg-light rounded-4">
              <CoursesPreview userId={String(userId)} />
            </Col>

            <Col className="bg-warning bg-opacity-50">
              <ActivityPreview />
            </Col>
          </Row>
          <Row className="">
            <Col xs={6} className="bg-primary bg-opacity-50">
              <CurrentProgress />
            </Col>

            <Col xs={6} className="bg-warning bg-opacity-75">
              <UserOverview userId={userId} />
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  )
}
