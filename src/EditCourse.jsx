import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, set } from "firebase/database";
import { database } from "./utilities/firebase";
import useFormData from './useFormData'; // Adjust the path as needed

const EditCourse = ({ schedule }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Ensure the course exists
  if (!schedule[id]) {
    return (
      <div className="container my-4">
        <h2>Course Not Found</h2>
        <p>The course you are trying to edit does not exist.</p>
      </div>
    );
  }

  const course = schedule[id];


  const validate = (data) => {
    const errors = {};

    // Validate Course Title
    if (data.title.trim().length < 2) {
      errors.title = 'Course title must be at least two characters.';
    }

    // Validate Meeting Times
    if (data.meets.trim() !== '') {
      const meetsRegex = /^(MWF|TuTh)\s+(\d{1,2}:\d{2}-\d{1,2}:\d{2})$/;
      const match = data.meets.trim().match(meetsRegex);
      if (!match) {
        errors.meets = 'Meeting time must be in the format "MWF HH:MM-HH:MM" or "TuTh HH:MM-HH:MM", e.g., "MWF 11:00-11:50".';
      } else {
        // Extract times for additional validation
        const [_, days, timespan] = match;
        const [startTime, endTime] = timespan.split('-').map(time => {
          const [hour, minute] = time.split(':').map(Number);
          return hour * 60 + minute; // Convert to minutes since midnight
        });

        if (startTime >= endTime) {
          errors.meets = 'Start time must be before end time.';
        }
      }
    }

    return errors;
  };

  // Initialize useFormData hook
  const {
    formData,
    errors,
    handleChange,
    handleValidate,
  } = useFormData(
    {
      term: course.term,
      number: "CS" + course.number,
      meets: course.meets,
      title: course.title,
    },
    validate
  );


  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidate()) {
      // Update Firebase Realtime Database
      set(ref(database, `courses/${id}`), {
        term: formData.term,
        number: formData.number.replace(/^CS/, ''), // Remove "CS" prefix
        meets: formData.meets,
        title: formData.title,
      })
        .then(() => {
          // Navigate back to home page after successful update
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
