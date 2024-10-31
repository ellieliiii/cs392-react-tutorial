// src/EditCourse.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { database, useProfile } from "./utilities/firebase"; // Adjust the path as needed

const EditCourse = ({ schedule }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ user, isAdmin }, isLoading, error] = useProfile(); // Get user and admin status

  // Initialize form state with default values
  const [formData, setFormData] = useState({
    term: '',
    number: '',
    meets: '',
    title: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    title: '',
    meets: '',
  });

  // Use useEffect to set formData once course data is available
  useEffect(() => {
    if (schedule && schedule[id]) {
      const course = schedule[id];
      setFormData({
        term: course.term || '',
        number: "CS" + (course.number || ''),
        meets: course.meets || '',
        title: course.title || '',
      });
    }
  }, [schedule, id]);

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="container my-4">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-4">
        <h2>Error loading profile</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  // Check if user is an admin
  if (!isAdmin) {
    return (
      <div className="container my-4">
        <h2>Access Denied</h2>
        <p>You must be an administrator to edit course information.</p>
      </div>
    );
  }

  // Ensure the course exists
  if (!schedule || !schedule[id]) {
    return (
      <div className="container my-4">
        <h2>Course Not Found</h2>
        <p>The course you are trying to edit does not exist.</p>
      </div>
    );
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Regular expression to validate meeting times
  const meetsRegex = /^(MWF|TuTh)\s+(\d{1,2}:\d{2}-\d{1,2}:\d{2})$/;

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { title: '', meets: '' };

    // Validate Course Title
    if (formData.title.trim().length < 2) {
      newErrors.title = 'Course title must be at least two characters.';
      valid = false;
    }

    // Validate Meeting Times
    if (formData.meets.trim() !== '') {
      const match = formData.meets.trim().match(meetsRegex);
      if (!match) {
        newErrors.meets = 'Meeting time must be in the format "MWF HH:MM-HH:MM" or "TuTh HH:MM-HH:MM", e.g., "MWF 11:00-11:50".';
        valid = false;
      } else {
        // Extract times
        const [_, days, timespan] = match;
        const [startTime, endTime] = timespan.split('-').map(time => {
          const [hour, minute] = time.split(':').map(Number);
          return hour * 60 + minute;
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
      // Update Firebase Realtime Database
      set(ref(database, `courses/${id}`), {
        term: formData.term,
        number: formData.number.replace(/^CS/, ''), // Remove "CS" prefix
        meets: formData.meets,
        title: formData.title,
      })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error("Error updating course:", error);
          alert("Failed to update the course. Please try again.");
        });
    }
  };

  return (
    <div className="container my-4">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Display Validation Errors */}
        {(errors.title || errors.meets) && (
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
            <option value="">Select Term</option>
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
          {errors.number && <div className="invalid-feedback">{errors.number}</div>}
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
            placeholder="e.g., MWF 11:00-11:50 or TuTh 09:30-10:45"
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
