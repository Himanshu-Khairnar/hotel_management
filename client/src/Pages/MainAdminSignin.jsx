import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { login } from "../actions/user.actions";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const nav = useNavigate();
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setShowError(true);
    } else {
      setShowError(false);
    }
    setValidated(true);

    const user = await login(formdata.username, formdata.password, "MainAdmin");
    !user && setShowError(true);

    user && nav(`/admindashboard/${user._id}`);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center bg-dark text-white"
    >
      <Row className="w-100">
        <Col
          md={12}
          xs={12}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            className="p-4 rounded border"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderColor: "#ccc",
              backgroundColor: "#1a1a1a",
            }}
          >
            <h2 className="text-center mb-3 text-white-50">Welcome Back</h2>
            <h4 className="text-center mb-4 text-white-50">Main Admin</h4>

            {showError && (
              <Alert
                variant="danger"
                onClose={() => setShowError(false)}
                dismissible
                className="mb-4"
              >
                Invalid username or password.
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label className="text-white">Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your username"
                  value={formdata.username}
                  onChange={(e) =>
                    setFormdata({ ...formdata, username: e.target.value })
                  }
                  className="bg-dark text-white border-secondary"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={(e) =>
                    setFormdata({ ...formdata, password: e.target.value })
                  }
                  className="bg-dark text-white border-secondary"
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  className="text-white-50"
                />
              </div>

              <Button
                variant="secondary"
                type="submit"
                className="w-100 mb-3"
                style={{ fontSize: "1rem", padding: "0.75rem 0" }}
              >
                Sign In
              </Button>

              <p className="text-center mb-0 text-white-50">
                Are you a GUEST ADMIN?{" "}
                <Link
                  to="/signin/guestadmin"
                  className="text-decoration-none"
                  style={{ color: "#ccc", fontWeight: "600" }}
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
