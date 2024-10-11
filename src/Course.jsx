import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css';

const Course = ({ id, course }) => (
  <div className="col-md-3 col-lg-2 mb-4"> 
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
        <hr /> {/* Horizontal line above the time */}
        <p className="card-text">{course.meets}</p>
      </div>
    </div>
  </div>
);

export default Course;
