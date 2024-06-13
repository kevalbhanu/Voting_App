import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCandidate() {
    const navigate = useNavigate();
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");

  const addCandidate = async () => {
    let result = await fetch("http://localhost:5000/candidate", {
      method: "post",
      body: JSON.stringify({ name, party,age }),
      headers: { "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
       },
    });
    result = await result.json();
    (result.Error)?alert(result.Error):alert("Data Saved");
    navigate("/candidate_list");
  };

  return (
     <div className="login-container">
      <h1>Add Candidate</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
      />
      <br />
      <input
        type="text"
        value={party}
        onChange={(e) => {
          setParty(e.target.value);
        }}
        placeholder="Party"
      />
      <br />
      <input
        type="text"
        value={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
        placeholder="Age"
      />
      <br/>
      <button onClick={addCandidate}>Add Candidate</button>
    </div>
  )
}
