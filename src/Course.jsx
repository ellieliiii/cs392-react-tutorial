import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Course.css';

const Course = ({ id, course, isSelected, toggleSelect }) => (
  <div className="col-md-3 col-lg-2 mb-4"> 
    <div className="card h-100">
      <div className="card-body">
        <h5 className="card-title">{course.term} CS {course.number}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
        <hr /> 
        <p className="card-text">{course.meets}</p>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isSelected}
            onChange={() => toggleSelect(id)}
          />
          <label className="form-check-label">Select Course</label>
        </div>
      </div>
    </div>
  </div>
);

export default Course;
