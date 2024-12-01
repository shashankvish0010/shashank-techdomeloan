import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Loader from "../components/Loader";

const Login: React.FC = () => {
  const userauth = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userauth?.login === true) {
      navigate("/user/dashboard");
    }
  }, [userauth]);

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col gap-5 justify-center items-center">
      {userauth?.loader == true ? (
        <Loader />
      ) : (
        <>
          {userauth?.message ? (
            <span className="shadow p-1 rounded-xl font-medium bg-blue-600 text-white">
              {userauth.message}
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
                <p className="text-sm text-gray-600">Email</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                  type="text"
                  name="user_email"
                  value={userauth?.user?.user_email}
                  onChange={userauth?.handleChange}
                />
              </span>
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Password</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                  type="password"
                  name="user_password"
                  value={userauth?.user?.user_password}
                  onChange={userauth?.handleChange}
                />
              </span>
            </form>
            <span className="w-[100%] flex items-center justify-evenly">
              <p className="font-medium">Create a new account</p>
              <span
                onClick={() => navigate("/user/register")}
                className="text-blue-600 cursor-pointer hover:font-medium"
              >
                Register
              </span>
            </span>
            <button
              onClick={() => {
                userauth?.dispatch({ type: "LOGIN" });
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

export default Login;
