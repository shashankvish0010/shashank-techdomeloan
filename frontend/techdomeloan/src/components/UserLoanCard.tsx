import React from "react";
import { userLoanDataType } from "../Types/dto";
import { useNavigate } from "react-router-dom";

const UserLoanCard: React.FC<userLoanDataType> = (props: userLoanDataType) => {
  const navigate = useNavigate();
  const {
    id,
    approved_date,
    loan_amount,
    loan_paid,
    loan_status,
    paid_amount,
    term_duration,
    term_paid,
  } = props;

  return (
    <div className="flex md:flex-row flex-col items-center justify-evenly p-5 gap-3 h-max md:h-[30vh] w-[80vw] rounded-xl border shadow-2xl bg-slate-100">
      <div className="rounded-md text-center w-max p-5 flex flex-col text-white justify-center items-center bg-blue-600 shadow-xl border">
        <p className="title text-lg">Rs {loan_amount}</p>
        <p className="text-xs font-light">Loan Amount</p>
      </div>
      <span className="md:hidden block h-[.20rem] w-[90%] bg-blue-600 rounded-xl"></span>
      <span className="hidden md:block h-[100%] w-[.20rem] bg-blue-600 rounded-xl"></span>
      <div className="flex flex-col items-center p-3 gap-2">
        <div className="h-max flex md:flex-row flex-col p-3 gap-2">
          {approved_date ? (
            <div className="title text-center md:text-xl text-base flex md:flex-col flex-row md:justify-start justify-between items-center p-3 gap-2">
              <span>Approved On</span>
              <span>{approved_date}</span>
            </div>
          ) : (
            <div className="title text-center md:text-xl text-base flex md:flex-col flex-row md:justify-evenly justify-between items-center p-3 gap-2">
              <span>Loan Status</span>
              <span>{loan_status}</span>
            </div>
          )}
          <div className="title text-center md:text-xl text-base flex md:flex-col flex-row md:justify-evenly justify-between items-center p-3 gap-2">
            <span>Term Duration</span>
            <span>{term_duration} Weeks</span>
          </div>
          <div className="title text-center md:text-xl text-base flex md:flex-col flex-row md:justify-evenly justify-between items-center p-3 gap-2">
            <span>Paid Amount</span>
            <span>{paid_amount}</span>
          </div>
          <div className="title text-center md:text-xl text-base flex md:flex-col flex-row md:justify-evenly justify-between items-center p-3 gap-2">
            <span>Term Paid</span>
            <span>{term_paid}</span>
          </div>
          <div className="title text-center md:text-xl text-base flex md:flex-col flex-row md:justify-evenly justify-between items-center p-3 gap-2">
            <span>Loan Paid</span>
            <span className="capitalize">{`${loan_paid}`}</span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/loan/${id}`)}
          className="md:w-[25vw] w-[70vw] h-max p-2 rounded-lg bg-blue-600 text-white title text-center md:text-xl text-lg"
        >
          Repay Loan
        </button>
      </div>
    </div>
  );
};

export default UserLoanCard;
