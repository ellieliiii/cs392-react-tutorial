// src/Course.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useProfile } from './utilities/firebase'; // Adjust the path as needed
import PropTypes from 'prop-types';

const Course = ({ id, course, isSelected, toggleSelect, isUnselectable }) => {
  const [{ user, isAdmin }, isLoading, error] = useProfile(); // Get user and admin status

  const formatMeets = (meets) => {
    const [days, times] = meets.split(' ');
    return `${days}: ${times}`;
  };

  if (isLoading) {
    return (
      <div className="col-md-3 col-lg-2 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-md-3 col-lg-2 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <p>Error loading admin status.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-3 col-lg-2 mb-4">
      <div className={`card h-100 ${isUnselectable ? 'unselectable' : ''}`}>
        <div className="card-body position-relative">
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
              disabled={isUnselectable}
            />
            <label className="form-check-label" htmlFor={`select-${id}`}>
              {isUnselectable ? 'Conflicting' : 'Select Course'}
            </label>
          </div>
          {isUnselectable && <span className="badge bg-danger position-absolute top-0 end-0 m-2">X</span>}

          {/* Conditionally Render Edit Button for Admins */}
          {isAdmin && (
            <Link to={`/edit/${id}`} className="btn btn-sm btn-outline-secondary mt-2">
              <i className="bi bi-pencil"></i> Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

Course.propTypes = {
  id: PropTypes.string.isRequired,
  course: PropTypes.shape({
    term: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    meets: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  isUnselectable: PropTypes.bool,
};

Course.defaultProps = {
  isUnselectable: false,
};

export default Course;
