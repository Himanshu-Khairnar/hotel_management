import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setShowError(true);
    } else {
      setShowError(false);
      console.log('Form submitted successfully');
    }
    setValidated(true);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        color: '#fff',
      }}
    >
      <Row className="h-100 w-100">
        <Col
          md={12}
          xs={12}
          className="d-flex align-items-center justify-content-center mx-auto"
        >
          <div
            className="bg-white p-4 rounded"
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '16px',
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >
            <h2
              className="text-center mb-2"
              style={{
                color: '#6a11cb',
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}
            >
              Welcome Back
            </h2>
            <h4
              className="text-center mb-4"
              style={{
                color: '#2575fc',
                fontWeight: '600',
              }}
            >
              Guest Admin
            </h4>

            {showError && (
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
                className="mb-4"
              >
                Please fill out all required fields correctly.
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter your email"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  style={{ fontSize: '0.9rem' }}
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                style={{
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  border: 'none',
                  fontSize: '1rem',
                  padding: '0.75rem 0',
                }}
              >
                Sign In
              </Button>

              <p
                className="text-center mb-0"
                style={{ fontSize: '0.9rem', color: '#6a11cb' }}
              >
                Are you a MAIN ADMIN?{' '}
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: '#2575fc', fontWeight: '600' }}
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
