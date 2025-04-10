import React, { useState } from "react";
import axios from "axios";
import "./JobForm.css";
const JobForm = () => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    link: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/jobs", form);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="company" placeholder="Company" onChange={handleChange} />
      <input name="role" placeholder="Role" onChange={handleChange} />
      <select name="status" onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input type="date" name="appliedDate" onChange={handleChange} />
      <input name="link" placeholder="Application Link" onChange={handleChange} />
      <button type="submit">Add Job</button>
    </form>
  );
};

export default JobForm;
