import React from "react";
import usePayment from "../hooks/usePayment";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Payment = () => {
  const { loanId } = useParams();
  const { repayAmount, loader, setRepayAmount, payRepaymentLoan, message } =
    usePayment();

  return (
    <div className="h-max w-screen p-3 flex flex-col items-center justify-evenly gap-5">
      <p className="title text-xl text-slate-800">Pay Your Loan Repayement.</p>
      <p className="title text-base text-slate-800">Click Pay to repay.</p>
      {loader == true ? (
        <Loader />
      ) : (
        <>
          {message ? (
            <span className="shadow p-1 rounded-xl font-medium bg-blue-600 text-white">
              {message}
            </span>
          ) : null}
          <div className="flex flex-col gap-3 justify-center items-center p-5">
            <form
              method="POST"
              className="flex flex-col justify-around items-center gap-3"
            >
              <span className="flex flex-col gap-1">
                <p className="text-sm text-gray-600">Enter Repayment Amount</p>
                <input
                  className="px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                  type="number"
                  name="user_email"
                  value={repayAmount}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRepayAmount(Number(e.target.value))
                  }
                />
              </span>
            </form>
            <button
              onClick={() => payRepaymentLoan(loanId || "")}
              className="md:w-[25vw] w-[70vw] h-max p-2 rounded-lg bg-blue-600 text-white title text-center md:text-xl text-lg"
            >
              Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
