import React, { useContext, useEffect, useState } from "react";
import { loanReqType, repayMentType } from "../Types/dto";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const usePayment = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState<boolean>(false);
  const [repayAmount, setRepayAmount] = useState<number>();
  const [loanApplication, setLoanApplication] = useState({
    loan_amount: 0,
    term_duration: 0,
  });
  const [loanData, setLoanData] = useState<loanReqType[]>([]);
  const [loanRepayData, setLoanRepayData] = useState<repayMentType>();
  const [message, setMessage] = useState<string | undefined>();
  const userauth = useContext(UserContext);

  useEffect(() => {
    if (!userauth?.login) {
      navigate("/admin/login");
    }
  }, [userauth?.login]);

  const handleLoanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoanApplication((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const initiateLoan = async (userId: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:8000" + "/initiate/loan/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loan_amount: loanApplication.loan_amount,
            term_duration: loanApplication.term_duration,
          }),
        }
      );
      if (response) {
        setLoader(false);
        const data = await response.json();
        if (data.success == true) {
          setMessage(data.message);
          setLoanData(data.data);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const manageRepayLoan = async (loanId: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:8000" + "/fetch/loan/" + loanId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setLoader(false);
        const data = await response.json();
        if (data.success == true) {
          setMessage(data.message);
          console.log(data);
          setLoanRepayData(data.data[0]);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userLoansFetch = async (userId: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:8000" + "/fetch/loans/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setLoader(false);
        const data = await response.json();
        if (data.success == true) {
          console.log(data);
          setMessage(data.message);
          setLoanData(data.data);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const payRepaymentLoan = async (loanId: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://localhost:8000" + "/repay/loan/" + loanId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repayAmount: repayAmount,
          }),
        }
      );
      if (response) {
        const data = await response.json();
        setLoader(false);
        if (data.success == true) {
          setMessage(data.message);
        } else {
          console.log(data);

          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loanData,
    loanRepayData,
    message,
    loader,
    repayAmount,
    setRepayAmount,
    payRepaymentLoan,
    handleLoanChange,
    loanApplication,
    initiateLoan,
    manageRepayLoan,
    userLoansFetch,
  };
};

export default usePayment;
