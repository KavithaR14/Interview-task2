import React from "react";
// import Task from './components/Task';

import "./App.css";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";


function App() {
   return (
    <div className="container">
      {/* <h1>To Do Credit Application</h1>
      <Task/> */}
       <h1>Student Job Tracker</h1>
      <JobForm/>
      <JobList />
    </div>
   );
  }

  export default App;