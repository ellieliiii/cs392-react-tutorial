import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './App.css';
import Course from './Course';
import CourseModal from './CourseModal'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditCourse from './EditCourse'; // Import EditCourse component

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('Fall'); 
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
        const data = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error("Error fetching the schedule data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  /**
   * Extracts the start time in minutes from the 'meets' string.
   * @param {string} meets - The meeting time string (e.g., "MWF 11:00-11:50").
   * @returns {number} - The start time in minutes since midnight.
   */
  const getStartTime = (meets) => {
    const timeMatch = meets.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      const hour = parseInt(timeMatch[1], 10);
      const minute = parseInt(timeMatch[2], 10);
      return hour * 60 + minute; // Convert to minutes since midnight
    }
    return 0; // Default to midnight if no match
  };

  /**
   * Sorts an array of courses based on their start times.
   * @param {Array} coursesArray - Array of course entries.
   * @returns {Array} - Sorted array of course entries.
   */
  const sortCoursesByStartTime = (coursesArray) => {
    return coursesArray.sort(([idA, courseA], [idB, courseB]) => {
      const startA = getStartTime(courseA.meets);
      const startB = getStartTime(courseB.meets);
      return startA - startB;
    });
  };

  /**
   * Determines if two courses have overlapping meeting times.
   * @param {Object} courseA - First course object.
   * @param {Object} courseB - Second course object.
   * @returns {boolean} - True if courses overlap, else false.
   */
  const isOverlapping = (courseA, courseB) => {
    const [daysA, timeA] = courseA.meets.split(' ');
    const [startA, endA] = timeA.split('-').map(time => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    });

    const [daysB, timeB] = courseB.meets.split(' ');
    const [startB, endB] = timeB.split('-').map(time => {
      const [hour, minute] = time.split(':').map(Number);
      return hour * 60 + minute;
    });

    // Check if any day overlaps
    const overlappingDays = daysA.split('').some(day => daysB.includes(day));
    if (!overlappingDays) return false;

    // Check if time overlaps
    return startA < endB && startB < endA;
  };

  // Filter courses based on the selected term
  const filteredCourses = Object.entries(schedule.courses).filter(
    ([id, course]) => course.term === selectedTerm
  );

  // Sort the filtered courses by start time
  const sortedCoursesArray = sortCoursesByStartTime(filteredCourses);

  // Toggle course selection
  const toggleSelect = (courseId) => {
    const courseToToggle = schedule.courses[courseId];

    if (selectedCourses.includes(courseId)) {
      // Unselecting the course; no conflict check needed
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      // Check for conflicts with already selected courses
      for (let id of selectedCourses) {
        const selectedCourse = schedule.courses[id];
        if (isOverlapping(selectedCourse, courseToToggle)) {
          alert(`Cannot select "${courseToToggle.title}" because it conflicts with "${selectedCourse.title}".`);
          return;
        }
      }

      // Select the course
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Get the selected courses from the schedule
  const selectedCourseDetails = selectedCourses.map(id => schedule.courses[id]);

  // Handle modal open and close
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to determine if a course is unselectable
  const getUnselectableCourses = () => {
    const unselectable = {};
    sortedCoursesArray.forEach(([id, course]) => {
      if (!selectedCourses.includes(id)) {
        // Check if this course overlaps with any selected course
        const conflict = selectedCourses.some(selectedId => 
          isOverlapping(schedule.courses[selectedId], course)
        );
        if (conflict) {
          unselectable[id] = true;
        }
      }
    });
    return unselectable;
  };

  const unselectableCourses = getUnselectableCourses();

  return (
    <Router>
      <div className="container">
        <header className="my-4">
          <h1>{schedule.title}</h1>
        </header>

        {/* Define Routes */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
              {/* Flex container for term selectors and modal button */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="fall"
                      value="Fall"
                      checked={selectedTerm === 'Fall'}
                      onChange={() => setSelectedTerm('Fall')}
                    />
                    <label className="form-check-label" htmlFor="fall">Fall</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="spring"
                      value="Spring"
                      checked={selectedTerm === 'Spring'}
                      onChange={() => setSelectedTerm('Spring')}
                    />
                    <label className="form-check-label" htmlFor="spring">Spring</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="winter"
                      value="Winter"
                      checked={selectedTerm === 'Winter'}
                      onChange={() => setSelectedTerm('Winter')}
                    />
                    <label className="form-check-label" htmlFor="winter">Winter</label>
                  </div>
                </div>

                {/* Button to open the modal, aligned to the right */}
                <button className="btn btn-primary" onClick={handleShowModal}>
                  View Selected Courses
                </button>
              </div>

              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <div className="row">
                    {sortedCoursesArray.length === 0 ? (
                      <p>No courses available for the selected term.</p>
                    ) : (
                      sortedCoursesArray.map(([id, course]) => (
                        <Course
                          key={id}
                          id={id}
                          course={course}
                          isSelected={selectedCourses.includes(id)}
                          toggleSelect={toggleSelect}
                          isUnselectable={unselectableCourses[id]} // New prop
                        />
                      ))
                    )}
                  </div>

                  {/* Course modal */}
                  <CourseModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    selectedCourses={selectedCourseDetails}
                  />
                </>
              )}
            </>
          } />

          {/* Edit Course Route */}
          <Route path="/edit/:id" element={<EditCourse schedule={schedule} setSchedule={setSchedule} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
