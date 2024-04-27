import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';

const Modals = ({ show, handleClose, modalResponses }) => {
  const [responses, setResponses] = useState(modalResponses);
  const parseDateHandler = (date) => {
    const stringDate = moment(`${date}`).format('YYYY-MM-DD HH:mm');
    const splitDate = stringDate.split(' ');
    return `${splitDate[0]} at ${splitDate[1]} `;
  };

  useEffect(() => {
    setResponses(modalResponses);
  }, [modalResponses]);

  return (
    <>
      <Modal show={show} onHide={handleClose} keyboard scrollable size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Responses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container ">
            {responses.map((response) => {
              return (
                <div className="col-3 border-bottom mb-2 d-flex justify-content-between container w-100">
                  <div>
                    <p>{response.message}</p>
                  </div>
                  <div>
                    <span>
                      Date of submission: {parseDateHandler(response.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Modals;
