import React, { useContext, useEffect } from "react";
import { AdminContext } from "../contexts/AdminContext";
import AdminLoanCard from "../components/AdminLoanCard";
import { loansType } from "../Types/dto";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const adminContext = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (adminContext?.dataFetched == true) {
      adminContext?.fetchLoanList();
    }
    adminContext?.fetchLoanList();
    if (!adminContext?.login) {
      navigate("/");
    }
  }, [adminContext?.login, adminContext?.dataFetched]);

  return (
    <div className="h-max w-screen flex flex-col items-center justify-around p-3 gap-5">
      <div className="h-[10vh] w-[90vw] flex justify-center items-center p-3">
        <p className="title text-2xl text-blue-600">{`Hey ${adminContext?.curruser?.firstname}, It's your admin dashboard.`}</p>
      </div>
      <div className="flex items-center">
        <span className="title text-blue-600 text-2xl p-3">
          <p>Loan applications & details.</p>
        </span>
      </div>
      <span className="h-[.25rem] w-[90%] bg-blue-600 rounded-xl"></span>
      <div className="w-[90vw] flex flex-col items-center justify-around gap-5 p-3">
        {adminContext?.loan?.map((loan: loansType, index: number) => (
          <AdminLoanCard
            key={index}
            loanid={loan.loanid}
            firstname={loan.firstname}
            lastname={loan.lastname}
            loan_amount={loan.loan_amount}
            user_email={loan.user_email}
            term_duration={loan.term_duration}
            loan_status={loan.loan_status}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
