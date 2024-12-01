import React, { useContext, useState } from "react";
import { userType } from "../Types/dto";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const useRegister = () => {
  const userauth = useContext(UserContext);
  const [user, setUser] = useState<userType>({
    firstname: "",
    lastname: "",
    user_email: "",
    user_password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { firstname, lastname, user_email, user_password, confirm_password } =
      user;
    try {
      userauth?.setLoader(true);

      const response = await fetch(
        "http://localhost:8000" + "/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstname,
            lastname,
            user_email,
            user_password,
            confirm_password,
          }),
        }
      );
      if (response) {
        const data = await response.json();
        setMessage(data);
        userauth?.setLoader(false);
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
  return { user, message, handleChange, handleSubmit };
};

export default useRegister;
