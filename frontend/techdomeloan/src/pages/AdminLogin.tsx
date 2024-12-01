import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminContext";
import Loader from "../components/Loader";

const AdminLogin: React.FC = () => {
  const adminAuth = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminAuth?.login === true) {
      navigate("/admin/dashboard");
    }
  }, [adminAuth]);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col gap-5 justify-center items-center">
      {" "}
      {adminAuth?.loader == true ? (
        <Loader />
      ) : (
        <>
          {adminAuth?.message ? (
            <span className="shadow p-1 font-medium bg-blue-600 text-white">
              {adminAuth.message}
            </span>
          ) : null}
          <div className="w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow">
            <h1 className="text-2xl font-semibold">Log In</h1>
            <span className="w-[100%] h-[0.2rem] bg-blue-600 rounded"></span>
            <form
              method="POST"
              className="flex flex-col justify-around items-center gap-3"
            >
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Admin Email</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                  type="text"
                  name="admin_email"
                  value={adminAuth?.admin?.admin_email}
                  onChange={adminAuth?.handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Admin Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                  type="password"
                  name="admin_password"
                  value={adminAuth?.admin?.admin_password}
                  onChange={adminAuth?.handleChange}
                />
              </span>
            </form>
            <span className="w-[100%] flex items-center justify-evenly">
              <p className="font-medium">Create a new account</p>
              <span
                onClick={() => navigate("/admin/register")}
                className="text-blue-600 cursor-pointer hover:font-medium"
              >
                Register
              </span>
            </span>
            <button
              onClick={() => {
                adminAuth?.dispatch({ type: "LOGIN" });
              }}
              className="bg-blue-600 p-2 font-medium text-white rounded"
            >
              Log In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLogin;
