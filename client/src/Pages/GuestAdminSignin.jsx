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
  const [formdata, setformdata] = useState({
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
      console.log("Form submitted successfully");
    }
    setValidated(true);
    console.log(formdata);
    const user = await login(
      formdata.username,
      formdata.password,
      "GuestAdmin"
    );
    console.log(user.id);
    !user && setShowError(true);

    user && nav(`/dashboard/guestadmin/${user._id}`);
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        color: "#fff",
        backgroundColor: "#000", // Strict black background
      }}
    >
      <Row className="h-100 w-100">
        <Col
          md={12}
          xs={12}
          className="d-flex align-items-center justify-content-center mx-auto"
        >
          <div
            className="bg-dark p-4 rounded"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "16px",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)", // Darker shadow
            }}
          >
            <h2
              className="text-center mb-2"
              style={{
                color: "#fff", // White text for heading
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              Welcome Back
            </h2>
            <h4
              className="text-center mb-4"
              style={{
                color: "#fff", // White color for subtitle
                fontWeight: "600",
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
                <Form.Label style={{ color: "#fff" }}>UserName</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your username"
                  value={formdata.username}
                  onChange={(e) =>
                    setformdata({ ...formdata, username: e.target.value })
                  }
                  style={{
                    backgroundColor: "#333", // Dark background for input
                    color: "#fff", // White text inside input
                    borderColor: "#555", // Lighter border for inputs
                  }}
                />
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label style={{ color: "#fff" }}>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter your password"
                  value={formdata.password}
                  onChange={(e) =>
                    setformdata({ ...formdata, password: e.target.value })
                  }
                  style={{
                    backgroundColor: "#333", // Dark background for input
                    color: "#fff", // White text inside input
                    borderColor: "#555", // Lighter border for inputs
                  }}
                />
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  style={{ fontSize: "0.9rem", color: "#fff" }} // White color for label
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-3"
                style={{
                  background: "#555", // Darker button background
                  border: "none",
                  fontSize: "1rem",
                  padding: "0.75rem 0",
                }}
              >
                Sign In
              </Button>

              <p
                className="text-center mb-0"
                style={{ fontSize: "0.9rem", color: "#fff" }}
              >
                Are you a MAIN ADMIN?{" "}
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "#fff", fontWeight: "600" }} // White link color
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
