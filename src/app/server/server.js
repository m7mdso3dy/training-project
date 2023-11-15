const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const jwt = require("jsonwebtoken");
const { secretKey } = require("./congig"); // Create a separate file to store your secret key
const jwtAuth = require("./jwt"); // Import the middleware
const { log } = require("console");

// Corrected path to use "assets" instead of "assests"
const recipesFilePath = "../../assets/data.json";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "assets")); // Corrected destination path
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "assets")));

//// handling getting recipes

const getData = new Promise((res, rej) => {
  fs.readFile(recipesFilePath, "utf8", (err, fileData) => {
    if (err) {
      rej(err);
    } else {
      res(JSON.parse(fileData));
    }
  });
});

/// handle login
app.post("/login", async (req, res) => {
  // Your authentication logic (e.g., check username and password)
  let userVerfied = false;
  const data = await getData;
  const users = data.users;
  /// verify user
  const user = users.filter(
    (user) => user.username == req.body.userCreds.email
  )[0];
  const roles = user.roles;
  console.log(roles);
  if (user) {
    //verify password
    user.password == req.body.userCreds.password ? (userVerfied = true) : "";
  } else {
    return res.sendStatus(404);
  }

  if (userVerfied) {
    const user = { username: req.body.userCreds.email };
    const token = jwt.sign(user, secretKey, { expiresIn: "1h" }); // Set an expiration time
    return res.json({ token, roles });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

///// get recipes
app.get("/get-recipes", jwtAuth, async (req, res, next) => {
  const allData = await getData;
  return res.json({ recipes: allData.recipes });
});

///// handle updating recipes

app.post("/update-data", jwtAuth, (req, res) => {
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

app.post("/upload-file", jwtAuth, upload.single("file"), (req, res) => {
  if (req.file) {
    const filePath = req.file.path;
    res.json({ filePath: path.basename(filePath) });
  } else {
    res.status(400).json({ error: "No file uploaded" });
  }
});
/////
app.get("/get-user-shopping-list", jwtAuth, async (req, res, next) => {
  const data = await getData;
  const shoppingLists = [...data.shoppingLists];
  // console.log(req.user.username, shoppingLists[0].ings);
  const userShopingList = shoppingLists.filter(
    (list) => list.userName == req.user.username
  );
  return res.json(userShopingList[0]?.ings);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
