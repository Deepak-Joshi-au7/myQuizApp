if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import cors from "cors";

//import Routes
import admin from "./routes/admin";

const app = express();

// Mongo Database
try {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}

//Mongo Database Connection
const db = mongoose.connection;
db.on("connected", () => console.log("Connected to Mongoose Datebase.."));

// View- Engines
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

//Morgan
app.use(morgan("tiny"));

//cors
app.use(cors());

//routes
app.use("/admin/", admin);

// Express
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("public"));

// Body-Parser
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

app.get("/", (req, res, next) => {
  res.send("this is the first page");
  next();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}/`);
});
