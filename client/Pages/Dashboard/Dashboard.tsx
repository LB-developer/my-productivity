import CoursesPreview from "../../components/Widgets/CoursesPreview"
import MonthlyHours from "../../components/Widgets/MonthlyHours"
import ActivityPreview from "../../components/Widgets/ActivityPreview"
import CurrentProgress from "../../components/Widgets/CurrentProgress"
import MonthlySpend from "../../components/Widgets/MonthlySpend"
import TodaysTasks from "../../components/Widgets/TodaysTasks"
import NewStudySession from "../../components/Widgets/NewStudySession"
import UserOverview from "../../components/Widgets/UserOverview"
import SearchBar from "../../components/SearchBar"
import { Container, Row, Col } from "react-bootstrap"
import { Helmet } from "react-helmet"

export default function Dashboard() {
  const userId: number = 1

  return (
    <div className="bg-secondary bg-opacity-25 ">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container fluid className="min-vh-100">
        <Row className="gap-3 gy-2">
          <Row className="gap-3 gy-2">
            {/* Header Section */}
            <Col xs={7} className="d-flex flex-column justify-content-center">
              <p className="mb-0 mt-4">Welcome to your,</p>
              <h2 className="fw-bold display-6">Productivity Dashboard</h2>
            </Col>
            <Col xs={4} className=" ms-auto mt-auto bg-light rounded-4">
              <SearchBar />
            </Col>
          </Row>
          <Row className="gap-3 gy-2">
            <Col className="bg-light ms-3 rounded-4">
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
            <Col className="bg-light ms-3 rounded-4">
              <TodaysTasks userId={String(userId)} />
            </Col>

            <Col className="bg-light rounded-4">
              <CoursesPreview userId={String(userId)} />
            </Col>

            <Col className="bg-warning bg-opacity-50">
              <ActivityPreview />
            </Col>
          </Row>
          <Row className="gap-3 gy-2 ">
            <Col xs={6} className="bg-primary ms-3 bg-opacity-50 h-100">
              <CurrentProgress />
            </Col>

            <Col className="bg-warning bg-opacity-75">
              <UserOverview userId={userId} />
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  )
}
