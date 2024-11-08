// ProductForm.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth-context";
import "../components/Login.css";
import { toast } from "react-toastify";
import MenuItems from "./pages/MenuItems";
import "react-toastify/dist/ReactToastify.css";
const ProductForm = () => {
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
      if(process.env.NODE_ENV === "production"){
         domainName = `https://jumpsquad-backend.vercel.app`;
        }else{
        domainName = import.meta.env.VITE_API_URL;
        }      const response = await axios.post(
        `${domainName}/api/products/admin/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
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
      <div className="form-container">
        <p className="title">Add product</p>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="input-group">
            <label htmlFor="title">Title</label>

            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={product.title}
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              onChange={handleChange}
              value={product.description}
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={product.price}
            />
          </div>
          <div className="input-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={product.category}
            />
          </div>
          <div className="flex">
            <label class="custum-file-upload" htmlFor="file">
              <div class="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24"
                >
                  <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    id="SVGRepo_tracerCarrier"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill=""
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div class="text">
                <span>Click to upload product image</span>
              </div>
              <input
                id="file"
                type="file"
                name="image"
                accept=".jpg,.png,.jpeg"
                onChange={handleChange}
              />
            </label>
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="preview" />
            )}
          </div>

          <button className="sign" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
