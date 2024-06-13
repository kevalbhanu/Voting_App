import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("voter");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/candidate_list");
    }
  });

  const login = async () => {
    let result = await fetch("http://localhost:5000/user/signin", {
      method: "post",
      body: JSON.stringify({
        name,
        age,
        email,
        mobileNum,
        address,
        aadharCardNumber,
        password,
        role,
      }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.response));
    localStorage.setItem("token", JSON.stringify(result.token));
    navigate("/candidate_list");
  };

  return (
    <div className="login-container">
      <h1>Register</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <br />
      <input
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
      />
      <br />
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br />
      <input
        type="text"
        value={mobileNum}
        onChange={(e) => setMobileNum(e.target.value)}
        placeholder="Phone Number"
      />
      <br />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      />
      <br />
      <input
        type="text"
        value={aadharCardNumber}
        onChange={(e) => setAadharCardNumber(e.target.value)}
        placeholder="Aadhar Care Number"
      />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <input
        type="text"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
      />
      <br />
      <button onClick={login}>Signup</button>
    </div>
  );
}
