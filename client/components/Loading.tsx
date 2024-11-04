import { Spinner } from "react-bootstrap";

export default function Loading() {

  return (
    <main className="d-flex h-100 align-items-center justify-content-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </main>
  )
}
