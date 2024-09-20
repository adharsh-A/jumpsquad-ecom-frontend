import React, { useContext, useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import axios from "axios";
import Card from "./UI/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { PlusIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AuthContext } from "../../context/auth-context.js";

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
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState();
  useEffect(() => {
    if (!product.image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      console.log(fileReader.result);
    };
    fileReader.readAsDataURL(product.image);
  }, [product.image]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, image: e.target.files[0] }); // Handle file input separately
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
    console.log("Current product state:", product); // Log the current state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", product.title);
    data.append("description", product.description);
    data.append("price", product.price);
    data.append("category", product.category);
    if (product.image) {
      data.append("image", product.image); // Append the file to FormData
    }

    try {
      let domainName;
      if (process.env.NODE_ENV === "production") {
        domainName = `https://jumpsquad-backend.vercel.app`;
      } else {
        domainName = import.meta.env.VITE_API_URL;
      }
      const response = await axios.post(
        `${domainName}/api/products/admin/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseData = response.data;
      toast.success(`${responseData.message}`);
    } catch (err) {
      toast.error(`${err.message}`);
    }
  };

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
              <BreadcrumbLink href="/admin/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div
        className="card-for-products"
        style={{
          marginLeft: "30px",
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Card title="Total Products" value="9" />
        <Card
          title="Total Orders"
          value="140"
          desc="21% more than last month"
        />
      </div>
      <div className="products-container">
        <div className="heading-products">
          <h1>All Products</h1>
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
              <DialogContent style={{marginTop: "20px" }}>
                <DialogHeader>
                  <DialogTitle>Add a product</DialogTitle>
                  <DialogDescription>
                    Fill in the details to add a new product.
                  </DialogDescription>
                </DialogHeader>

                {/* Form Section */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  {/* Title Input */}
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Product title"
                      onChange={handleChange}
                      value={product.title}
                    />
                  </div>

                  {/* Description Input */}
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      placeholder="Product description"
                    />
                  </div>

                  {/* Price Input */}
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      id="price"
                      onChange={handleChange}
                      value={product.price}
                    />
                  </div>

                  {/* Image Picker */}
                  <div>
                    <Label htmlFor="image">Upload Image</Label>
                    <Input
                      id="file"
                      type="file"
                      name="image"
                      accept=".jpg,.png,.jpeg"
                      onChange={handleChange}
                    />
                  </div>

                  {/* Submit Button */}
                  {previewUrl && (
              <img src={previewUrl} alt="Preview" className="preview" width={50}/>
            )}
                  <Button onClick={(e) => handleSubmit(e)} type="submit">Add Product</Button>
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
        </div>
      </div>
    </>
  );
};

export default Products;
