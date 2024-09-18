import React from "react"
import Card from "./UI/Card";
import "./Dashboard.css";

const Dashboard = (props) => {
  return (
    <div className="dashboard">
      <Card title="Total Orders" value="140" desc="21% more than last month" />
      <Card title="Revenue Generated" value="₹6478" desc="21% more than last month" />
      <Card title="Total Users" value="99" desc="21% more than last month" />
      <Card title="Total Products" value="8" desc="21% more than last month"  />
      <Card title="Total Visitors" value="999" desc="21% more than last month" />
      <Card title="Total Visitors" value="999" desc="21% more than last month" />
      
    </div>
  )
};

export default Dashboard;
