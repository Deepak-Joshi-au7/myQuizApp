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
import student from "./routes/students";

const app = express();
const db = process.env.DATABASE_URL || "mongodb://localhost:27017/quiz";
console.log(db);
// Mongo Database
try {
  mongoose.connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("database is connected...")
  );
} catch (error) {
  console.log(error);
}

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
app.use("/students/", student);

// Express
app.use(express.json());
app.use(expressLayouts);
app.use(express.static("public"));

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("this is the first page");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}/`);
});
