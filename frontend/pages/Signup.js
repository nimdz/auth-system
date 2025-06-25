import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      alert("User registered");
      window.location.href = "/";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signup}>Signup</button>
    </div>
  );
}

export default Signup;
