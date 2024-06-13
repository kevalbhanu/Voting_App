import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CandidateList() {
  const navigate = useNavigate();
  const [candidateList, setCandidateList] = useState("");
  useEffect(() => {
    getCandidate();
  },[]);

  const getCandidate = async () => {
    let result = await fetch("http://localhost:5000/candidate/list", {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setCandidateList(result);
  };
  const voteCandidate = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/candidate/vote/${id}`, {
      method: "post",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    alert(result.Message);
    navigate("/votecount");
  };

  const deleteCandidate = async (id) => {
    let result = await fetch(`http://localhost:5000/candidate/${id}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    (result.Error)?alert(result.Error):alert("Candidate Deleted");
    navigate('/candidate_list');
    getCandidate();
  };

  return (
    <div className="products-list">
      <h1>Candidate List</h1>
      <ul>
        <li>Sr. No</li>
        <li>Name</li>
        <li>Party</li>
        <li>Age</li>
        <li>Operations</li>
      </ul>
      {candidateList.length > 0 ? (
        candidateList.map((item, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.party}</li>
            <li>{item.age}</li>
            <li>
              <button onClick={() => voteCandidate(item.id)}>Vote</button>
              <button onClick={() => deleteCandidate(item.id)}>Delete</button>
              <Link to={`/update_candidate/${item.id}`}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Product Found </h1>
      )}
    </div>
  );
}
