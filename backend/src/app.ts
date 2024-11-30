import express from "express";
import dotenv from "dotenv";
import db from "../dbconnect";

// import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());
app.use(require("../routes/routes"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

app.on("error", (error) => console.log(`Server error: ${error}`));
