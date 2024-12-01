import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAdminRegister from "../hooks/useAdminRegister";
import { AdminContext } from "../contexts/AdminContext";
import Loader from "../components/Loader";

const AdminRegister: React.FC = () => {
  const navigate = useNavigate();
  const { admin, message, handleChange, handleSubmit } = useAdminRegister();
  const adminauth = useContext(AdminContext);
  return (
    <div className="h-max w-[100vw] flex flex-col p-3 gap-5 justify-center items-center">
      {adminauth?.loader == true ? (
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
                  value={admin?.firstname}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Lasname</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="text"
                  name="lastname"
                  value={admin?.lastname}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Email</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="text"
                  name="admin_email"
                  value={admin?.admin_email}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="password"
                  name="admin_password"
                  value={admin?.admin_password}
                  onChange={handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Confirm Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[45vw] border rounded"
                  type="password"
                  name="confirm_password"
                  value={admin?.confirm_password}
                  onChange={handleChange}
                />
              </span>
            </form>
            <span className="w-[100%] flex items-center justify-evenly">
              <p className="font-medium">Get admin password?</p>
              <span className="text-blue-600 cursor-pointer hover:font-medium">
                <a
                  href="https://github.com/shashankvish0010/shashank-techdomeloan"
                  target="blank"
                >
                  Github Readme
                </a>
              </span>
            </span>
            <span className="w-[100%] flex items-center justify-evenly">
              <p className="font-medium">Already have an account?</p>
              <span
                onClick={() => navigate("/admin/login")}
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

export default AdminRegister;
