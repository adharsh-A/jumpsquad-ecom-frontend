import React, { useState } from "react";
import "./Orders.css";
import Card from "./UI/Card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV008",
    paymentStatus: "Paid",
    totalAmount: "$400.00",
    paymentMethod: "Credit Card",
  }, // More rows added if needed
];

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(invoices.length / ITEMS_PER_PAGE);

  // Get the current items based on pagination
  const currentItems = invoices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div
        className="breadcrumb"
        style={{ marginLeft: "30px", marginBottom: "30px" }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/orders">Orders</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "30px",
          marginRight: "30px",
          gap: "20px",
          position: "relative",
          flexWrap: "wrap",
          width: "fit-content",
        }}
      >
        <Card
          title="Total Orders"
          value="140"
          desc="21% more than last month"
        />

        <Card
          title="Avg Order Value"
          value="499"
          desc="10% more than last month"
        />
        <Card
          title="Total Revenue"
          value="₹6999"
          desc="5% more than last month"
        />
      </div>
      <div className="orders-container">
        <div className="heading-orders">
          <h1>Recent Orders</h1>
        </div>
        <div className="table-container">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="pagination-button"
                style={{ marginRight: "10px",border:"1px solid white",borderRadius:"5px",padding:"3px" }}
                >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
                style={{ marginRight: "10px",border:"1px solid white",borderRadius:"5px",padding:"3px" ,marginLeft:"10px"}}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
