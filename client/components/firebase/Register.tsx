import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../src/store/ContextProvider.tsx'
import { doCreateUserWithEmailAndPassword } from '../../src/firebase/AuthService.ts'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

export default function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { userLoggedIn } = useAuth()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isRegistering) {
      setIsRegistering(true)
      await doCreateUserWithEmailAndPassword(email, password)
    }
  }

  return (
    <div className="bg-light d-flex align-items-center justify-content-center vh-100">
      {userLoggedIn && <Navigate to="/dashboard" replace />}

      <Container style={{ maxWidth: '432px' }}>
        <Row className="justify-content-center">
          <Col>
            <Card className="shadow-sm border-0 rounded-3">
              <Card.Body>
                <h3 className="text-center mb-4">Create a New Account</h3>
                <Form onSubmit={(e) => onSubmit(e)}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                      disabled={isRegistering}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      autoComplete="off"
                      required
                      disabled={isRegistering}
                    />
                  </Form.Group>

                  {errorMessage && (
                    <p className="text-danger text-center mb-3">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={isRegistering}
                  >
                    {isRegistering ? 'Signing Up...' : 'Sign Up'}
                  </Button>
                </Form>

                <p className="text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="fw-bold">
                    Continue
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

