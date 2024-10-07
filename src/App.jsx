import './App.css';

const schedule = {
  "title": "CS Courses for 2018-2019",
  "courses": {
    "F101": {
      "term": "Fall",
      "number": "101",
      "meets": "MWF 11:00-11:50",
      "title": "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110": {
      "term": "Fall",
      "number": "110",
      "meets": "MWF 10:00-10:50",
      "title": "Intro Programming for non-majors"
    },
    "S313": {
      "term": "Spring",
      "number": "313",
      "meets": "TuTh 15:30-16:50",
      "title": "Tangible Interaction Design and Learning"
    },
    "S314": {
      "term": "Spring",
      "number": "314",
      "meets": "TuTh 9:30-10:50",
      "title": "Tech & Human Interaction"
    }
  }
};

const Course = ({ id, course }) => (
  <div className="course">
    <h2>{course.term} CS {course.number}</h2>
    <p><strong>{course.title}</strong></p>
    <p><em>{course.meets}</em></p>
  </div>
);

const App = () => {
  const coursesArray = Object.entries(schedule.courses);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{schedule.title}</h1>
      </header>
      <div className="course-list">
        {coursesArray.map(([id, course]) => (
          <Course key={id} id={id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default App;
