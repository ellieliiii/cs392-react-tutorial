import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CourseModal.css'

const CourseModal = ({ show, handleClose, selectedCourses }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Selected Courses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedCourses.length === 0 ? (
          <p>No courses selected.</p>
        ) : (
          <ul>
            {selectedCourses.map(course => (
              <li key={course.number}>
                {course.term} CS {course.number}: {course.title} ({course.meets})
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
