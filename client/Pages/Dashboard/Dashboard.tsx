import CoursesPreview from "../../components/Widgets/CoursesPreview"
import MonthlyHours from "../../components/Widgets/MonthlyHours"
import ActivityPreview from "../../components/Widgets/ActivityPreview"
import CurrentProgress from "../../components/Widgets/CurrentProgress"
import MonthlySpend from "../../components/Widgets/MonthlySpend"
import TodaysTasks from "../../components/Widgets/TodaysTasks"
import NewStudySession from "../../components/Widgets/NewStudySession"
import UserOverview from "../../components/Widgets/UserOverview"
import Stash from "../../components/Widgets/Stash"
import SearchBar from "../../components/SearchBar"
import { Container, Row, Col } from "react-bootstrap"
import { Helmet } from "react-helmet"
import { useAuth } from "../../src/store/ContextProvider"

export default function Dashboard() {
  const auth = useAuth();
  if (!auth || !auth.user?.publicId) return <p>Checking user data...</p>
  const publicUserId = auth.user?.publicId

  return (
    <div className="mt-3 ms-3">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container fluid className="min-vh-100">
        <Row className="gap-3 gy-2">
          <Row className="gap-3 gy-2">
            {/* Header Section */}
            <Col xs={7} className="d-flex flex-column justify-content-center">
              <p className="mb-0">Welcome to your,</p>
              <h2 className="fw-bold display-6 mb-0">Dashboard</h2>
            </Col>
            <Col xs={4} className=" ms-auto mt-auto bg-dark  rounded-4">
              <SearchBar />
            </Col>
          </Row>
          <Row className="gap-3 gy-2">
            <Col xs={3} className="bg-primary-subtle rounded-4">
              <MonthlyHours publicUserId={publicUserId} />
            </Col>

            <Col xs={3} className="bg-primary-subtle rounded-4">
              <MonthlyHours publicUserId={publicUserId} />
            </Col>

            <Col xs={2} className="bg-primary-subtle">
              <Col className="bg-danger h-50">
                <MonthlySpend />
              </Col>
              <Col className="bg-primary h-50">
                <Stash />
              </Col>
            </Col>
            <Col className="bg-primary-subtle rounded-4">
              <NewStudySession />
            </Col>
          </Row>
          <Row className="gap-3 gy-2">
            <Col xs={8} className="bg-primary-subtle rounded-4">
              <TodaysTasks publicUserId={publicUserId} />
            </Col>

            <Col className="bg-primary-subtle rounded-4">
              <CoursesPreview publicUserId={publicUserId} />
            </Col>
          </Row>
          <Row className="gap-3 gy-2 ">
            <Col xs={4} className="bg-primary-subtle h-100">
              <CurrentProgress />
            </Col>

            <Col xs={3} className="bg-primary-subtle">
              <UserOverview publicUserId={publicUserId} />
            </Col>
            <Col className="bg-primary-subtle bg-opacity-50">
              <ActivityPreview />
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  )
}
