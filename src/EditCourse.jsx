// src/EditCourse.jsx

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCourse = ({ schedule, setSchedule }) => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();

  // Ensure the course exists
  if (!schedule.courses[id]) {
    return (
      <div className="container my-4">
        <h2>Course Not Found</h2>
        <p>The course you are trying to edit does not exist.</p>
      </div>
    );
  }

  const course = schedule.courses[id];

  // Initialize form state with existing course data
  const [formData, setFormData] = useState({
    term: course.term,
    number: "CS" + course.number,
    meets: course.meets,
    title: course.title,
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    title: '',
    meets: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Regular expression to validate meeting times
  // Example of valid format: "MWF 11:00-11:50"
  const meetsRegex = /^(MWF|TuTh)\s+(\d{1,2}:\d{2}-\d{1,2}:\d{2})$/;


  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { title: '', meets: '' };

    // 1. Validate Course Title
    if (formData.title.trim().length < 2) {
      newErrors.title = 'Course title must be at least two characters.';
      valid = false;
    }

    // 2. Validate Meeting Times
    if (formData.meets.trim() !== '') {
      const match = formData.meets.trim().match(meetsRegex);
      if (!match) {
        newErrors.meets = 'Meeting time must be in the format "Days HH:MM-HH:MM", e.g., "MWF 11:00-11:50".';
        valid = false;
      } else {
        // Extract days and times
        const [_, days, timespan] = match;
        const [startTime, endTime] = timespan.split('-').map(time => {
          const [hour, minute] = time.split(':').map(Number);
          return hour * 60 + minute; // Convert to minutes since midnight
        });

        // Check if start time is before end time
        if (startTime >= endTime) {
          newErrors.meets = 'Start time must be before end time.';
          valid = false;
        }
      }
    }

    setErrors(newErrors);

    if (valid) {
      // Update the schedule state
      setSchedule(prevSchedule => ({
        ...prevSchedule,
        courses: {
          ...prevSchedule.courses,
          [id]: {
            term: formData.term,
            number: formData.number.replace(/^CS/, ''), // Remove "CS" prefix
            meets: formData.meets,
            title: formData.title,
          },
        },
      }));

      // Navigate back to home page
      navigate('/');
    }
  };

  return (
    <div className="container my-4">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Display Validation Errors */}
        { (errors.title || errors.meets) && (
          <div className="alert alert-danger">
            {errors.title && <div>{errors.title}</div>}
            {errors.meets && <div>{errors.meets}</div>}
          </div>
        )}

        {/* Term */}
        <div className="form-group mb-3">
          <label htmlFor="term">Term</label>
          <select
            className={`form-control ${errors.term ? 'is-invalid' : ''}`}
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
          >
            <option value="Fall">Fall</option>
            <option value="Spring">Spring</option>
            <option value="Winter">Winter</option>
          </select>
        </div>

        {/* Course Number */}
        <div className="form-group mb-3">
          <label htmlFor="number">Course Number</label>
          <input
            type="text"
            className={`form-control ${errors.number ? 'is-invalid' : ''}`}
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Meeting Times */}
        <div className="form-group mb-3">
          <label htmlFor="meets">Meeting Times</label>
          <input
            type="text"
            className={`form-control ${errors.meets ? 'is-invalid' : ''}`}
            id="meets"
            name="meets"
            value={formData.meets}
            onChange={handleChange}
            placeholder="e.g., MWF 11:00-11:50"
            required
          />
          {errors.meets && <div className="invalid-feedback">{errors.meets}</div>}
        </div>

        {/* Course Title */}
        <div className="form-group mb-3">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-2">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
