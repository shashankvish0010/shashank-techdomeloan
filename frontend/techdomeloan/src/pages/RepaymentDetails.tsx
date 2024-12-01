import React, { useEffect } from "react";
import RepayCard from "../components/RepayCard";
import usePayment from "../hooks/usePayment";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const RepaymentDetails: React.FC = () => {
  const { loanRepayData, manageRepayLoan, loader, message } = usePayment();
  const { loanId } = useParams();
  useEffect(() => {
    if (loanId) {
      manageRepayLoan(loanId);
    }
  }, [usePayment, loanId]);

  return (
    <div className="h-max w-screen p-3 flex flex-col items-center justify-evenly gap-5">
      <div className="h-max w-[90vw] flex flex-col items-center justify-evenly  p-3 gap-5">
        <p className="title text-xl text-slate-800">
          Pay Your Loan Repayement.
        </p>
        <p className="title text-base text-slate-800">Click Pay to repay.</p>
      </div>
      <span className="h-[.25rem] w-[90%] bg-blue-600 rounded-xl"></span>
      {loader == true ? (
        <Loader />
      ) : (
        <>
          {message ? (
            <span className="shadow p-1 rounded-xl font-medium bg-blue-600 text-white">
              {message}
            </span>
          ) : null}
          <div className="flex flex-col items-center justify-evenly p-3 gap-3 h-max md:h-[30vh] w-[80vw] md:w-[75vw] rounded-xl border shadow-2xl bg-slate-100">
            {loanRepayData
              ? loanRepayData.repayment_dates.map((date, index) => (
                  <RepayCard
                    key={index}
                    id={loanRepayData.id}
                    code={index}
                    repayment_amount={loanRepayData.repayment_amount}
                    repayment_date={date}
                    loan_paid={loanRepayData.loan_paid}
                    paid={loanRepayData.term_paid}
                  />
                ))
              : null}
          </div>
        </>
      )}
    </div>
  );
};

export default RepaymentDetails;
