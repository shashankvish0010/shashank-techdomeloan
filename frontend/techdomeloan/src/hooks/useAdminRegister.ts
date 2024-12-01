import React, { useContext, useState } from "react";
import { adminType } from "../Types/dto";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";

const useAdminRegister = () => {
  const [admin, setAdmin] = useState<adminType>({
    firstname: "",
    lastname: "",
    admin_email: "",
    admin_password: "",
    confirm_password: "",
  });
  const adminauth = useContext(AdminContext);

  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((admin) => ({
      ...admin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      admin_email,
      admin_password,
      confirm_password,
    } = admin;
    adminauth?.setLoader(true);
    try {
      const response = await fetch(
        "https://shashank-techdomeloan.onrender.com" + "/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            admin_email,
            admin_password,
            confirm_password,
          }),
        }
      );
      if (response) {
        adminauth?.setLoader(false);
        const data = await response.json();
        setMessage(data);
        if (data.success === true) {
          setMessage(data.message);
          navigate("/admin/login");
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { admin, message, handleChange, handleSubmit };
};

export default useAdminRegister;
