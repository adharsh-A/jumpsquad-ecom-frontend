import React from "react";
import "./Products.css";
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

import Card from "./UI/Card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {Button} from "@/components/ui/button"


import { PlusIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

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
];

const Products = () => {
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
  <BreadcrumbLink href="/admin/products">Products</BreadcrumbLink>
</BreadcrumbItem>

</BreadcrumbList>
</Breadcrumb>
</div>
<div className="card-for-products" style={{marginLeft: "30px",display:"flex",gap:"20px",marginTop:"20px"}}>
<Card
          title="Total Orders"
          value="140"
          desc="21% more than last month"
        />
                <Card
          title="Total Orders"
          value="140"
          desc="21% more than last month"
        />
</div>
    <div className="products-container">
      <div className="heading-products">
        <h1>Recent Products</h1>
        <div className="dialog-product" style={{ float: "right" }}>
        <Dialog>
      <DialogTrigger>
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <PlusIcon />
          add product
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product.
          </DialogDescription>
        </DialogHeader>
        
        {/* Form Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Title Input */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" placeholder="Product title" />
          </div>
          
          {/* Description Input */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Product description" />
          </div>
          
          {/* Price Input */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input type="number" id="price" placeholder="Price" />
          </div>

          {/* Image Picker */}
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input type="file" id="image" accept="image/*" />
          </div>
          
          {/* Submit Button */}
          <Button>Add Product</Button>
        </div>
      </DialogContent>
    </Dialog>
        </div>
      </div>
      <div className="table-container-products">
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
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
      </div>
    </div>
    </>
  );
};

export default Products;
