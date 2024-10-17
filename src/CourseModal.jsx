import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './App.css'; // Reuse App.css for modal styles

const CourseModal = ({ show, handleClose, selectedCourses }) => {
  // Function to format 'meets' string
  const formatMeets = (meets) => {
    const [days, times] = meets.split(' ');
    return `${days}: ${times}`;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Selected Courses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedCourses.length === 0 ? (
          <p>No courses selected.</p>
        ) : (
          <ul className="list-group">
            {selectedCourses.map(course => (
              <li key={course.number} className="list-group-item">
                <strong>{course.term} CS {course.number}</strong>: {course.title} <br />
                <em>{formatMeets(course.meets)}</em>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseModal;
