import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API } from '../helpers/api';
import { useNavigate, Navigate } from 'react-router-dom';

const LoginForm = () => {
  const initialState = {
    username: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [alertMSG, setAlertMSG] = useState();
  const [submit, setSubmit] = useState(false);

  const sucessMessage = 'Valid authentication. Redirecting to Admin';

  const failureMessage = 'Wrong username/password';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const closeAlert = () => {
    setSubmit(false);
    setAlertMSG();
  };

  const handleSubmit = async (e) => {
    setSubmit(false);
    e.preventDefault();
    try {
      const { data } = await API.login(formData);
      setAlertMSG(sucessMessage);
      setSubmit(true);
      setFormData(initialState);
      setTimeout(() => {
        setFormData(initialState);
        window.location = `/admin`;
      }, 3000);
    } catch (err) {
      if (err.response.status) {
        setAlertMSG(failureMessage);
        setSubmit(true);
      }
    }
  };
  return (
    <>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form
              className="query-form"
              style={{ color: 'white' }}
              onSubmit={handleSubmit}
            >
              <h4 className="text-center">Admin Login</h4>

              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  onChange={handleChange}
                  required
                  value={formData.username}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange}
                  required
                  value={formData.password}
                />
              </Form.Group>

              <div className="d-flex justify-content-center mt-2">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <div className="w-25  d-flex justify-content-evenly mt-4">
            {submit && (
              <div
                className={
                  alertMSG === sucessMessage
                    ? 'alert alert-success'
                    : 'alert alert-danger'
                }
                role="alert"
              >
                {alertMSG}{' '}
                {alertMSG === sucessMessage && (
                  <i
                    className="fa-solid fa-spinner fa-spin"
                    style={{ color: '322f2f' }}
                  ></i>
                )}
                {alertMSG === failureMessage && (
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={closeAlert}
                    style={{ marginLeft: '2px' }}
                  ></button>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
