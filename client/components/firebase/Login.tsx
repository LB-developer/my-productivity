import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../src/firebase/AuthService.ts'
import { useAuth } from '../../src/store/ContextProvider.tsx'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

export default function Login() {
  const { userLoggedIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      await doSignInWithEmailAndPassword(email, password)
      // doSendEmailVerification()
    }
  }

  const onGoogleSignIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!isSigningIn) {
      setIsSigningIn(true)
      doSignInWithGoogle().catch(err => {
        setIsSigningIn(false)
        setErrorMessage(err)
        console.error(err)
      })
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
                <h3 className="text-center mb-4">Welcome Back</h3>
                <Form onSubmit={onSubmit}>
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
                      autoComplete="current-password"
                      required
                    />
                  </Form.Group>

                  {errorMessage && (
                    <p className="text-danger text-center mb-3">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-100 mb-3"
                    variant="primary"
                    disabled={isSigningIn}
                  >
                    {isSigningIn ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Form>

                <p className="text-center">
                  Don't have an account?{' '}
                  <Link to="/register" className="fw-bold">
                    Sign up
                  </Link>
                </p>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2">OR</span>
                  <hr className="flex-grow-1" />
                </div>

                <Button
                  className="w-100 d-flex align-items-center justify-content-center gap-2"
                  variant="outline-secondary"
                  onClick={onGoogleSignIn}
                  disabled={isSigningIn}
                >
                  {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );

}

