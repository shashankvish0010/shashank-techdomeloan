import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import UserLoanCard from "../components/UserLoanCard";
import usePayment from "../hooks/usePayment";
import Loader from "../components/Loader";

const UserDashboard: React.FC = () => {
  const userauth = useContext(UserContext);
  const {
    loanData,
    loanApplication,
    initiateLoan,
    handleLoanChange,
    userLoansFetch,
    message,
  } = usePayment();

  useEffect(() => {
    userLoansFetch(userauth?.curruser?.id);
  }, [usePayment]);

  return (
    <div className="h-max w-screen flex flex-col items-center justify-center p-5 gap-5">
      <div className="h-max w-screen p-5 flex flex-col items-center justify-center gap-5">
        {userauth?.loader == true ? (
          <Loader />
        ) : (
          <>
            {message ? (
              <span className="shadow p-1 rounded-md font-medium bg-blue-600 text-white">
                {message}
              </span>
            ) : null}
            <div className="w-max h-max flex flex-col justify-evenly gap-5 p-5 shadow border">
              <h1 className="text-2xl font-semibold">Request Loan</h1>
              <span className="w-[100%] h-[0.2rem] bg-blue-600 rounded"></span>
              <form
                method="POST"
                className="flex flex-col justify-around items-center gap-3"
              >
                <span className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600">Enter Loan Amount</p>
                  <input
                    className="focus-visible:outline-none px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                    type="number"
                    name="loan_amount"
                    value={loanApplication?.loan_amount}
                    onChange={handleLoanChange}
                  />
                </span>
                <span className="flex flex-col gap-1">
                  <p className="text-sm text-gray-600">Enter Term Duration</p>
                  <input
                    className="px-2 h-[2.25rem] w-[65vw] md:w-[35vw] border rounded"
                    type="number"
                    name="term_duration"
                    value={loanApplication?.term_duration}
                    onChange={handleLoanChange}
                  />
                </span>
              </form>
              <span className="w-[100%] bg-blue-600 rounded-lg h-[.25rem]"></span>
              <button
                onClick={() => initiateLoan(userauth?.curruser?.id)}
                className="bg-blue-600 p-2 font-medium text-white rounded"
              >
                Apply
              </button>
            </div>
            <div className="h-max w-screen p-5 flex flex-col justify-center items-center gap-5">
              <span className="h-[.25rem] w-[90%] bg-blue-600 rounded-xl"></span>
              <p className="title text-xl text-slate-800">
                Your Loan Applications & Details.
              </p>
              <div className="h-max flex flex-col items-center justify-evenly p-3 gap-8 md:h-[30vh] w-[80vw] md:w-[75vw] rounded-xl border shadow-2xl bg-slate-100">
                {loanData.length > 0
                  ? loanData.map((loan) => (
                      <UserLoanCard
                        id={loan?.id}
                        loan_amount={loan?.loan_amount}
                        term_duration={loan?.term_duration}
                        term_paid={loan?.term_paid}
                        loan_paid={loan?.loan_paid}
                        loan_status={loan?.loan_status}
                        approved_date={loan?.approved_date}
                        paid_amount={loan?.paid_amount}
                      />
                    ))
                  : null}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
