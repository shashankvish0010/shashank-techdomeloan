import { Request, Response } from "express";
import db from "../dbconnect";
import dotenv from "dotenv";
import {
  userAuthRegisterUtils,
  userAuthLoginUtils,
  adminAuthRegisterUtils,
  adminAuthLoginUtils,
} from "../utils/authUtils";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
dotenv.config();
const jwt = require("jsonwebtoken");

export const userRegister = async (req: Request, res: Response) => {
  const id = uuidv4();
  const { firstname, lastname, user_password, confirm_password, user_email } =
    req.body;
  const authWarnings = await userAuthRegisterUtils(
    firstname,
    lastname,
    user_password,
    confirm_password,
    user_email
  );
  if (!authWarnings?.success) {
    res.json(authWarnings);
    return;
  }
  try {
    const salt = Number(bcrypt.genSalt(10));
    const hashedPassword = await bcrypt.hash(user_password, salt);
    if (!hashedPassword) {
      res.json({ success: false, message: "Password not hashed" });
      return;
    }
    const result = await db.query(
      "INSERT INTO Customer(id, firstname, lastname, user_password, user_email) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [id, firstname, lastname, hashedPassword, user_email]
    );
    if (result) {
      res.json({
        success: true,
        data: result.rows[0],
        message: "Registered Successfully",
      });
    } else {
      res.json({ success: false, message: "Not Registered Successfully" });
    }
  } catch (error) {
    console.log("Error occured while registration", error);
    res.json({ success: false, message: "Error occured while registration" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { user_email, user_password } = req.body;
  const authWarnings = await userAuthLoginUtils(user_email, user_password);
  if (!authWarnings?.success) {
    res.json(authWarnings);
    return;
  }

  const result = await db.query("SELECT * FROM Customer WHERE user_email=$1", [
    user_email,
  ]);
  if (result) {
    const token = await jwt.sign(
      result.rows[0].id,
      process.env.CUSTOMER_SECRET
    );
    if (!token) {
      res.json({ success: true, message: "Token not generated" });
    }
    res.json({
      success: true,
      data: { token, user: result.rows[0] },
      message: "Login successfully",
    });
  }
};

export const adminRegister = async (req: Request, res: Response) => {
  const id = uuidv4();
  const { firstname, lastname, admin_password, confirm_password, admin_email } =
    req.body;
  const authWarnings = await adminAuthRegisterUtils(
    firstname,
    lastname,
    admin_password,
    confirm_password,
    admin_email
  );
  if (!authWarnings?.success) {
    res.json(authWarnings);
    return;
  }
  try {
    const salt = Number(bcrypt.genSalt(10));
    const hashedPassword = await bcrypt.hash(admin_password, salt);
    if (!hashedPassword) {
      res.json({ success: false, message: "Password not hashed" });
      return;
    }
    const result = await db.query(
      "INSERT INTO Admin(id, firstname, lastname, admin_password, admin_email) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [id, firstname, lastname, hashedPassword, admin_email]
    );
    if (result) {
      res.json({ success: true, message: "Admin Registered Successfully" });
    } else {
      res.json({ success: false, message: "Not Registered Successfully" });
    }
  } catch (error) {
    console.log("Error occured while registration", error);
    res.json({ success: false, message: "Error occured while registration" });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  const { admin_email, admin_password } = req.body;
  const authWarnings = await adminAuthLoginUtils(admin_email, admin_password);
  if (!authWarnings?.success) {
    res.json(authWarnings);
    return;
  }

  const result = await db.query("SELECT * FROM Admin WHERE admin_email=$1", [
    admin_email,
  ]);
  if (result) {
    const token = await jwt.sign(result.rows[0].id, process.env.ADMIN_SECRET);
    if (!token) {
      res.json({ success: true, message: "Token not generated" });
    }
    res.json({
      success: true,
      data: { token, admin: result.rows[0] },
      message: "Login successfully",
    });
  }
};
