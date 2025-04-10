import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobList.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [updatedStatuses, setUpdatedStatuses] = useState({});

  const fetchJobs = async () => {
    const res = await axios.get("http://localhost:5000/api/jobs");
    setJobs(res.data);
  };

  const handleStatusChange = (id, newStatus) => {
    setUpdatedStatuses((prev) => ({ ...prev, [id]: newStatus }));
  };

  const updateStatus = async (id) => {
    if (!updatedStatuses[id]) return;
    await axios.put(`http://localhost:5000/api/jobs/${id}`, { status: updatedStatuses[id] });
    setUpdatedStatuses((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <div key={job._id} className="job-card">
          <h3>{job.company}</h3>
          <p>{job.role}</p>
          <p>Status: {job.status}</p>
          <select
            value={updatedStatuses[job._id] || job.status}
            onChange={(e) => handleStatusChange(job._id, e.target.value)}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          {updatedStatuses[job._id] && updatedStatuses[job._id] !== job.status && (
            <button onClick={() => updateStatus(job._id)} className="update-btn">
              Update
            </button>
          )}
          <p>Date: {new Date(job.appliedDate).toLocaleDateString()}</p>
          <a href={job.link} target="_blank" rel="noreferrer">Link</a>
          <button onClick={() => deleteJob(job._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
