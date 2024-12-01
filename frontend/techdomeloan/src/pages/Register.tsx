import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { UserContext } from "../contexts/UserContext";
import Loader from "../components/Loader";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const userauth = useContext(UserContext);

  const { user, message, handleChange, handleSubmit } = useRegister();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col gap-5 justify-center items-center">
      {" "}
      {userauth?.loader == true ? (
        <Loader />
      ) : (
        <>
          {message ? (
            <span className="shadow p-1 font-medium bg-blue-600 text-white">
              {message}
            </span>
          ) : null}
          <div className="w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow">
            <h1 className="text-2xl font-semibold">Register</h1>
            <span className="w-[100%] h-[0.2rem] bg-blue-600 rounded"></span>
            <form
              method="POST"
              className="flex flex-col justify-arounf items-center gap-3"
            >
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Firstname</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="text"
                  name="firstname"
                  value={user?.firstname}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Lasname</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="text"
                  name="lastname"
                  value={user?.lastname}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Email</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="text"
                  name="user_email"
                  value={user?.user_email}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="password"
                  name="user_password"
                  value={user?.user_password}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Confirm Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="password"
                  name="confirm_password"
                  value={user?.confirm_password}
                  onChange={handleChange}
                />
              </span>
            </form>
            <span className="w-[100%] flex items-center justify-evenly">
              <p className="font-medium">Already have an account?</p>
              <span
                onClick={() => navigate("/user/login")}
                className="text-blue-600 cursor-pointer hover:font-medium"
              >
                Login
              </span>
            </span>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 p-2 font-medium text-white rounded"
            >
              Register
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
