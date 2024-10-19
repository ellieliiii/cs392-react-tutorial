import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCourse = ({ schedule, setSchedule }) => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate();

  const course = schedule.courses[id];

  // Initialize form state with existing course data
  const [formData, setFormData] = useState({
    term: course.term,
    number: "CS" + course.number,
    meets: course.meets,
    title: course.title,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();


    // Navigate back to home page
    navigate('/');
  };

  return (
    <div className="container my-4">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        {/* Term */}
        <div className="form-group">
          <label htmlFor="term">Term</label>
          <select
            className="form-control"
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
        <div className="form-group">
          <label htmlFor="number">Course Number</label>
          <input
            type="text"
            className="form-control"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>

        {/* Meets */}
        <div className="form-group">
          <label htmlFor="meets">Meeting Times</label>
          <input
            type="text"
            className="form-control"
            id="meets"
            name="meets"
            value={formData.meets}
            onChange={handleChange}
            placeholder="e.g., MWF 11:00-11:50"
            required
          />
        </div>

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Course Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-3">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
