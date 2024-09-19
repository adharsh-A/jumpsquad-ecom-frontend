import React from "react"
import Card from "./UI/Card";
import "./Dashboard.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {CombinedCharts} from "./UI/Visitors.jsx";

const Dashboard = (props) => {
  return (
    <>
    <div className="breadcrumb" style={{marginLeft: "30px"}}>

    <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Overview</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
    </div>
    <div className="dashboard">
      
      <Card title="Total Orders" value="140" desc="21% more than last month" />
      <Card title="Revenue Generated" value="₹6478" desc="21% more than last month" />
      <Card title="Total Users" value="99" desc="21% more than last month" />
      <Card title="Total Products" value="8" desc="21% more than last month"  />
      <Card title="Total Visitors" value="999" desc="21% more than last month" />
      <Card title="Total Visitors" value="999" desc="21% more than last month" />
      
    </div>
        <div>
       <CombinedCharts/> 

        </div>
    </>
  )
};

export default Dashboard;
