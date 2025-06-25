import React from "react";

function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) return <p>You need to login</p>;

  return (
    <div>
      <h2>Protected Dashboard</h2>
      <p>Only accessible with valid token</p>
    </div>
  );
}

export default Dashboard;
