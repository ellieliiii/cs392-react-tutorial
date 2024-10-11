import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Course from './Course';

const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: {} });
  const [loading, setLoading] = useState(true);

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

  const coursesArray = Object.entries(schedule.courses);

  return (
    <div className="container">
      <header className="my-4">
        <h1>{schedule.title}</h1>
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {coursesArray.map(([id, course]) => (
            <Course key={id} id={id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
