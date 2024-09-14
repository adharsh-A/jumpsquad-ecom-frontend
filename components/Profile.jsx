import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function EditProfile() {
  const navigate = useNavigate();
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    profilePhoto: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null); // State to hold image preview

  // Handle input changes for text fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile photo change
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePhoto: file,
      });
      setPhotoPreview(URL.createObjectURL(file)); // Display image preview
    }
  };
  
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend)
    console.log("Form Data:", formData);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          marginTop: 10,
          backgroundColor: "transparent",
        }}
      >
        <Box
          component="form"
          sx={{
            p: 3,
            width: "100%",
            maxWidth: 700,
            maxHeight: "90vh",
            backgroundColor: darkTheme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 3,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" gutterBottom>
            Edit Profile
          </Typography>

          {/* Profile Photo */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              alt="Profile Photo"
              src={photoPreview || "/static/images/avatar/1.jpg"}
              sx={{ width: 60, height: 60, mr: 1 }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handlePhotoChange}
              />
              <PhotoCamera />
            </IconButton>
          </Box>

          {/* Username Input */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            sx={{ mb: 2 }}
          />

          {/* Address Input */}
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          {/* Submit Button */}
          <Grid container justifyContent="flex-end">
            <Button
              style={{
                marginRight: "10px",
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
              }}
              onClick={cancelHandler}
              type="submit"
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
