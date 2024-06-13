import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/candidate_list");
    }
  });

  const login = async () => {
    let result = await fetch("http://localhost:5000/user/login", {
      method: "post",
      body: JSON.stringify({ aadharCardNumber, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("token", JSON.stringify(result.token));
    navigate("/candidate_list");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="text"
        value={aadharCardNumber}
        onChange={(e) => {
          setAadharCardNumber(e.target.value);
        }}
        placeholder="AadharCard number"
      />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      />
      <br />
      <button onClick={login}>Login</button>
    </div>
  );
}
