import React from "react";
import { Icon } from "@iconify/react";
import { repayCardType } from "../Types/dto";
import { useNavigate } from "react-router-dom";

const RepayCard: React.FC<repayCardType> = (props: repayCardType) => {
  const { id, code, repayment_amount, repayment_date, loan_paid, paid } = props;
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 rounded-xl h-max  w-[80vw] md:w-[75vw] flex flex-col p-3 gap-3 items-center justify-evenly">
      <div className="w-[70vw] md:w-[50vw] h-[20vh] p-3 flex flex-row items-center justify-around rounded-xl bg-blue-600 text-white">
        <div className="title md:text-xl text-base flex flex-col justify-evenly items-center p-3 gap-2">
          {code <= paid - 1 ? (
            <Icon icon="ic:outline-paid" height="2rem" color="white" />
          ) : (
            <Icon icon="mdi:receipt-text-pending" height="2rem" color="white" />
          )}
        </div>
        <div className="title md:text-xl text-base flex flex-col justify-evenly items-center p-3 gap-2">
          <span>Date.</span>
          <span className="text-xs">{`${repayment_date}`}</span>
        </div>
        <div className="title md:text-xl text-base flex flex-col justify-evenly items-center p-3 gap-2">
          <span>Repay.</span>
          <span className="text-xs">{`Rs ${repayment_amount}`}</span>
        </div>
      </div>
      {code <= paid - 1 || loan_paid == true ? (
        <button className="md:w-[25vw] w-[70vw] h-max p-2 rounded-lg bg-green-500 text-white title text-center md:text-xl text-lg">
          Paid
        </button>
      ) : (
        <button
          onClick={() => navigate(`/repay/loan/${id}`)}
          className="md:w-[25vw] w-[70vw] h-max p-2 rounded-lg bg-blue-600 text-white title text-center md:text-xl text-lg"
        >
          Pay
        </button>
      )}
    </div>
  );
};

export default RepayCard;
