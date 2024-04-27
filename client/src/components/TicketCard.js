import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { API } from '../helpers/api';
import { useState, useEffect, useContext } from 'react';
import Modals from './Modals';
import { appContext, HelpDeskContext } from '../helpers/context';
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
const cookies = new Cookies();

const statusArray = ['IN PROGRESS', 'NEW', 'RESOLVED'];

const TicketCard = ({ ticket, ticketList }) => {
  const [show, setShow] = useState(false);
  const [modalResponses, setModalResponses] = useState(ticket.responses);

  const handleClose = () => setShow(false);
  const { allAdmins } = useContext(appContext);
  const initialState = {
    response: '',
    status: ticket.status,
    adminId: ticket.adminId,
    ticketId: ticket.id,
  };

  const parseDateHandler = (date) => {
    const stringDate = moment(`${date}`).format('YYYY-MM-DD HH:mm');
    const splitDate = stringDate.split(' ');
    return `${splitDate[0]} at ${splitDate[1]} `;
  };

  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [alertMSG, setAlertMSG] = useState();

  const sucessMessage = 'Ticket Updated';
  const failureMessage = 'Sorry, something went wrong.';

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
      const { data } = await API.update('tickets/new-ticket', formData);
      if (formData.response !== '') {
        const { data } = await API.create('tickets/new-response', {
          message: formData.response,
          ticketId: ticket.id,
        });
        const {
          data: { Ticket },
        } = await API.getOne('tickets', ticket.id);

        setModalResponses(Ticket.responses);
      }

      setAlertMSG(sucessMessage);
      setSubmit(true);
      setFormData((prevState) => ({
        ...prevState,
        response: '',
        status: formData.status,
        adminId: formData.adminId,
      }));
      console.log('user is supposed to receive a response email');
    } catch (err) {
      if (err.response.status) {
        setAlertMSG(failureMessage);
        setSubmit(true);
      }
    }
  };

  return (
    <>
      <div
        className="border border-primary container border-3 my-3 "
        style={{ borderRadius: '5px' }}
      >
        <div className="container d-flex justify-content-end mt-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => setShow(true)}
          >
            Responses
          </button>
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="container flex-column">
            <div>
              <span>
                <b>Ticket ID:</b>&nbsp;
                {ticket.id}
              </span>
            </div>
            <div>
              <span>
                <b>Date of submission:</b>&nbsp;
                {parseDateHandler(ticket.createdAt)}
              </span>
            </div>
            <div>
              <span>
                <b>Sender:</b>&nbsp;
                {ticket.name}
              </span>
            </div>
            <div>
              <span>
                <b>Email:</b>&nbsp; {ticket.email}
              </span>
            </div>
            <div>
              <span>
                <b>Query:</b>&nbsp;
                {ticket.query}
              </span>
            </div>
          </div>
          <div className="d-flex container my-2">
            <span className="align-bottom">
              <b>Admin:</b>&nbsp;
            </span>
            <select
              className="form-select w-50"
              aria-label="Default select example"
              onChange={handleChange}
              name="adminId"
              value={formData.adminId}
            >
              <option selected key={uuidv4()}>
                {ticket.adminId}
              </option>
              {allAdmins
                .filter((admin) => {
                  return admin.username !== ticket.adminId;
                })
                .map((admin) => {
                  return (
                    <option value={admin.username} key={uuidv4()}>
                      {admin.username}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="d-flex container my-2">
            <span className="align-bottom">
              <b>Status:</b>&nbsp;
            </span>
            <select
              className="form-select w-50"
              aria-label="Default select example"
              onChange={handleChange}
              name="status"
              value={formData.status}
            >
              <option selected key={uuidv4()}>
                {ticket.status}
              </option>
              {statusArray
                .filter((status) => {
                  return status !== ticket.status;
                })
                .map((status) => {
                  return (
                    <option value={status} key={uuidv4()}>
                      {status}
                    </option>
                  );
                })}
            </select>
          </div>

          <Form.Group controlId="formResponse" className="container">
            <Form.Label className="text-center">
              <b>Response:</b>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Type your response"
              name="response"
              onChange={handleChange}
              value={formData.response}
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-2 mb-3">
            <Button variant="primary" type="submit">
              Update Ticket
            </Button>
          </div>
        </Form>
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
      </div>
      <Modals
        show={show}
        handleClose={handleClose}
        modalResponses={modalResponses}
      />
    </>
  );
};

export default TicketCard;
