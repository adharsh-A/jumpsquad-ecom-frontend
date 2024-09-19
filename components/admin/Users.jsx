import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const Users = () => {
  return (
    <>
      <div className="breadcrumb" style={{ marginLeft: "30px" }}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/users">Users</BreadcrumbLink>
            </BreadcrumbItem>

          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
};

export default Users;
