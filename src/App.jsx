import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Course from './Course';

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState('Fall'); // State to track selected term

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

  const coursesArray = Object.entries(schedule.courses).filter(([id, course]) => course.term === selectedTerm);

  return (
    <div className="container">
      <header className="my-4">
        <h1>{schedule.title}</h1>
      </header>

      {/* Term filter radio buttons */}
      <div className="mb-4">
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {coursesArray.length === 0 ? (
            <p>No courses available for the selected term.</p>
          ) : (
            coursesArray.map(([id, course]) => (
              <Course key={id} id={id} course={course} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
