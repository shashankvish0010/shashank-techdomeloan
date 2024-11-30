import { emailValidate } from "../services/validators";
import db from "../dbconnect";
import bcrypt from "bcrypt";

export const userAuthRegisterUtils = async (
  firstname: string,
  lastname: string,
  user_password: string,
  confirm_password: string,
  user_email: string
) => {
  if (
    !firstname ||
    !lastname ||
    !user_password ||
    !confirm_password ||
    !user_email
  ) {
    return { success: false, message: "Fill all the fields" };
  }

  try {
    if (!emailValidate(user_email)) {
      return { success: false, message: "Enter a valid email address" };
    }

    if (user_password !== confirm_password) {
      return { success: false, message: "Password does not match." };
    }

    const user = await db.query("SELECT id FROM Customer WHERE user_email=$1", [
      user_email,
    ]);
    console.log(user.rowCount);

    if (Number(user.rowCount) > 0) {
      return { success: false, message: "Email already exists." };
    }

    return { success: true, message: "No user auth errors found." };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const userAuthLoginUtils = async (
  user_email: string,
  user_password: string
) => {
  if (!user_email || !user_password) {
    return { success: false, message: "Fill all the fields." };
  }
  try {
    if (!emailValidate(user_email)) {
      return { success: false, message: "Enter a valid email address" };
    }
    const user = await db.query("SELECT * FROM Customer WHERE user_email=$1", [
      user_email,
    ]);

    if (Number(user.rowCount) <= 0) {
      return { success: false, message: "Email do not exists." };
    }

    if (!(await bcrypt.compare(user_password, user.rows[0].user_password))) {
      return { success: false, message: "Incorrect password." };
    }

    return { success: true, message: "No user login auth errors found." };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const adminAuthRegisterUtils = async (
  firstname: string,
  lastname: string,
  admin_password: string,
  confirm_password: string,
  admin_email: string
) => {
  if (
    !firstname ||
    !lastname ||
    !admin_password ||
    !confirm_password ||
    !admin_email
  ) {
    return { success: false, message: "Fill all the fields" };
  }

  try {
    if (!emailValidate(admin_email)) {
      return { success: false, message: "Enter a valid email address" };
    }

    const validPasswords = ["AX34DV", "BGCDSV", "GHTR3G"];

    if (admin_password !== confirm_password) {
      return { success: false, message: "Password does not match." };
    }

    if (!validPasswords.includes(admin_password)) {
      return {
        success: false,
        message:
          "Enter provided admin password only, You can get it in Readme file.",
      };
    }

    const admin = await db.query("SELECT id FROM Admin WHERE admin_email=$1", [
      admin_email,
    ]);

    if (Number(admin.rowCount) > 0) {
      return { success: false, message: "Email already exists." };
    }

    return { success: true, message: "No admin auth errors found." };
  } catch (error) {
    return { success: false, message: error };
  }
};

export const adminAuthLoginUtils = async (
  admin_email: string,
  admin_password: string
) => {
  if (!admin_email || !admin_password) {
    return { success: false, message: "Fill all the fields." };
  }
  try {
    if (!emailValidate(admin_email)) {
      return { success: false, message: "Enter a valid email address" };
    }
    const admin = await db.query("SELECT * FROM Admin WHERE admin_email=$1", [
      admin_email,
    ]);

    if (Number(admin.rowCount) <= 0) {
      return { success: false, message: "Email do not exists." };
    }

    if (!(await bcrypt.compare(admin_password, admin.rows[0].admin_password))) {
      return { success: false, message: "Incorrect password." };
    }

    return { success: true, message: "No admin login auth errors found." };
  } catch (error) {
    return { success: false, message: error };
  }
};
