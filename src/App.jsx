import './App.css';

const schedule = {
  title: "CS Courses for 2018-2019"
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* Display the schedule title */}
        <h1>{schedule.title}</h1>
      </header>
    </div>
  );
};

export default App;
