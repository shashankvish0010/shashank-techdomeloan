import React, { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { loansType } from "../Types/dto";

const AdminLoanCard: React.FC<loansType> = (props) => {
  const adminContext = useContext(AdminContext);

  return (
    <div className="bg-blue-600 w-[85vw] text-white flex md:flex-row flex-col items-center justify-center gap-5 rounded-xl shadow-xl border p-3">
      <div className="title md:text-xl text-lg h-max md:w-[35vw] w-[70vw] flex flex-col items-start justify-around gap-3 p-3">
        <span className="h-max w-[80%]">
          Applicant: {props.firstname} {props.lastname}
        </span>
        <span className="h-max w-[80%]">Email: {props.user_email}</span>
        <span className="h-max w-[80%]">Loan Amount: {props.loan_amount}</span>
        <span className="h-max w-[80%]">
          Term Duration: {props.term_duration}
        </span>
      </div>
      <div className="text-xl title h-[100%] md:w-[35vw] w-[70vw] flex flex-col items-center justify-around gap-3 p-3">
        <span>Loan Status</span>
        <span className="h-max w-[80%]">{props.loan_status}</span>
        {props.loan_status == "PENDING" ? (
          <span
            onClick={() => {
              adminContext?.approveLoan(props.loanid);
            }}
            className="cursor-pointer rounded-xl h-max w-max p-3 bg-slate-100 text-blue-600"
          >
            APPROVE LOAN
          </span>
        ) : (
          <span className="rounded-xl h-max w-max p-3 bg-yellow-500 text-black">
            LOAN APPROVED
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminLoanCard;
