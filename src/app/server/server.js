const express = require("express");
const cors = require("cors"); // Import the cors package
const app = express();
const port = 3000;
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const recipesFilePath = "../../assets/data.json";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "assests")); // Specify where to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Define the filename for the uploaded file
  },
});

const upload = multer({ storage });

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Middleware to parse JSON requests

// Serve static files from the "public" directory
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "assests")));

// POST request to the "/update-data" route
app.post("/update-data", (req, res) => {
  fs.writeFile(
    recipesFilePath,
    JSON.stringify({
      recipes: req.body,
    }),
    "utf8",
    (err) => {
      if (err) {
        res.status(500).json({ message: err });
      } else {
        res.status(200).json({ message: "File updated successfully" });
      }
    }
  );
});

app.post("/upload-file", upload.single("file"), (req, res) => {
  if (req.file) {
    const filePath = req.file.path; // Path to the saved file
    res.json({ filePath: path.basename(filePath) });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
