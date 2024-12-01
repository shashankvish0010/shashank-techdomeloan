import express from "express";
import dotenv from "dotenv";
import db from "../dbconnect";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://shashank-techdomeloan.vercel.app",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(require("../routes/routes"));

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);

app.on("error", (error) => console.log(`Server error: ${error}`));
