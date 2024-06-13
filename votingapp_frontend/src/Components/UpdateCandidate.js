import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateCandidate() {
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    getCandidateDetails();
  },[]);

  const getCandidateDetails = async () => {
    let result = await fetch(
      `http://localhost:5000/candidate/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setName(result.name);
    setParty(result.party);
    setAge(result.age);
  };

  const updateCandidate =async ()=>{
    console.log(name,party,age);
    let result =await fetch(`http://localhost:5000/candidate/${params.id}`,{
      method:"put",
      body:JSON.stringify({name,party,age}),
      headers:{
        "Content-Type":"application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log(result);
    if(result){
      navigate("/candidate_list");
      
    }
  }

  return(
    <div className='product-container'>
    <h1>Update Candidate</h1>
    <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter product name'/>
    <input type='text' value={party}  onChange={(e)=>{setParty(e.target.value)}} placeholder='Enter Price'/>
    <input type='text' value={age} onChange={(e)=>{setAge(e.target.value)}} placeholder='Enter Category'/>
    <button onClick={updateCandidate}>Update Candidate</button>
  </div>
  )
}
