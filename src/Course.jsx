import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Reuse App.css for modal styles
import { Link } from 'react-router-dom'; // Import Link

const Course = ({ id, course, isSelected, toggleSelect, isUnselectable }) => {
  // Function to format 'meets' string
  const formatMeets = (meets) => {
    const [days, times] = meets.split(' ');
    return `${days}: ${times}`;
  };

  // Determine card classes based on selectability
  const cardClasses = `card h-100 ${isUnselectable ? 'unselectable' : ''}`;

  return (
    <div className="col-md-3 col-lg-2 mb-4"> 
      <div className={cardClasses}>
        <div className="card-body">
          <h5 className="card-title">{course.term} CS {course.number}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{course.title}</h6>
          <hr /> 
          <p className="card-text">{formatMeets(course.meets)}</p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelect(id)}
              id={`select-${id}`}
              disabled={isUnselectable} // Disable if unselectable
            />
            <label className="form-check-label" htmlFor={`select-${id}`}>
              {isUnselectable ? 'Conflicting' : 'Select Course'}
            </label>
          </div>
          {isUnselectable && <span className="badge badge-danger ml-2">X</span>}

          {/* Edit Button */}
          <Link to={`/edit/${id}`} className="btn btn-sm btn-outline-secondary mt-2">
            <i className="bi bi-pencil"></i> 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Course;
