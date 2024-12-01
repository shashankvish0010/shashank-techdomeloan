import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import working from "../utils/working.json";
import loginImg from "../assets/lgin.avif";
import loan_req from "../assets/loan_request.avif";
import admin_img from "../assets/admin.jpg";
import admin_dash_img from "../assets/admin_dahsboard.jpg";
import loan_pay_img from "../assets/repay_loan.avif";

const Home: React.FC = () => {
  const navigate = useNavigate(); //navigate instance used to navigate to different pages without reloading the page.
  const images = [loginImg, loan_req, admin_img, admin_dash_img, loan_pay_img];
  return (
    //Home page developed to get username also a bit of herosection to display my name and few links.
    <div className="bg-blue-600 text-white min-h-screen h-max w-screen flex flex-col items-center justify-evenly gap-5 p-5">
      <div className="font-semibold flex flex-col justify-center items-center gap-5 p-3">
        <h2 className="logo text-2xl md:text-5xl">Techdome Loan App</h2>
        <p className="title text-center text-xl md:text-2xl">
          Designed & Developed by{" "}
          <span className="text-yellow-300">
            <a
              href="https://www.linkedin.com/in/shashank-vishwakarma-full-stack-developer/"
              target="blank"
            >
              Shashank Vishwakarma
            </a>
          </span>
        </p>
      </div>
      <div className="flex flex-col p-3 gap-10 items-center justify-center">
        <div className="bg-slate-100 w-[90vw] border-2 rounded-xl h-max flex flex-col justify-evenly gap-5 p-5 shadow">
          <div className="h-max w-[85vw] flex flex-col items-center gap-5 p-3">
            {working?.map((data, index) => (
              <div className="h-max w-[85vw] flex md:flex-row flex-col justify-evenly items-center gap-5 p-3">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ behaviour: "smooth", duration: 0.7 }}
                  className="text-black h-max md:w-[40%] w-[85vw] p-3 flex flex-col gap-3"
                >
                  <span className="text-blue-600 font-medium md:text-xl text-base uppercase">
                    {data.step}
                  </span>
                  <h1 className="title md:text-3xl text-xl">{data.title}</h1>
                  <p className="md:text-xl text-base font-thin">
                    {data.description}
                  </p>
                </motion.div>
                <div className="md:w-[40%] w-[85vw] flex justify-center items-center">
                  <motion.img
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ behaviour: "smooth", duration: 0.7 }}
                    className="rounded-2xl shadow-xl"
                    src={images[index]}
                    width={"250rem"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span
            onClick={() => navigate("/user/login")}
            className="cursor-pointer title rounded-md shadow-xl text-3xl border h-max p-2 bg-slate-100 text-blue-600"
          >
            Get Started
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
