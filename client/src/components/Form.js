import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { API } from '../helpers/api';
import { useNavigate, Navigate } from 'react-router-dom';

const FormComponent = () => {
  const initialState = {
    name: '',
    email: '',
    query: '',
    adminId: 'UNASSIGNED',
  };

  const [formData, setFormData] = useState(initialState);
  const [alertMSG, setAlertMSG] = useState();
  const [submit, setSubmit] = useState(false);

  const sucessMessage =
    'Your request was submitted. Our team will contact you as soon as possible.';

  const failureMessage = 'Sorry, something went wrong.';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setSubmit(false);
    e.preventDefault();
    try {
      const { data } = await API.create('tickets/new-ticket', formData);
      setAlertMSG(sucessMessage);
      setSubmit(true);
      setFormData(initialState);
      console.log(
        'user is supposed to receive an email confirming the submission'
      );
    } catch (err) {
      if (err.response.status) {
        setAlertMSG(failureMessage);
        setSubmit(true);
      }
    }
  };

  const closeAlert = () => {
    setSubmit(false);
    setAlertMSG();
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form
            className="query-form"
            style={{ color: 'white' }}
            onSubmit={handleSubmit}
          >
            <h4 className="text-center">Help Desk Request Form</h4>
            <div className="text-center">Submit your request</div>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                onChange={handleChange}
                required
                value={formData.email}
              />
            </Form.Group>

            <Form.Group controlId="formQuery">
              <Form.Label>What's the issue?</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your query"
                name="query"
                onChange={handleChange}
                required
                value={formData.query}
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
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeAlert}
                  style={{ marginLeft: '2px' }}
                ></button>
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
  );
};

export default FormComponent;
