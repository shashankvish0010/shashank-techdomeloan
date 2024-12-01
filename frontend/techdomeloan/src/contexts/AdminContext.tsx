import { createContext, useReducer, useState, useEffect } from "react";
import { adminLoginType, adminContextvalue, loansType } from "../Types/dto";

export const AdminContext = createContext<adminContextvalue | null>(null);

export const AdminauthProvider = (props: any) => {
  const storedUser = localStorage.getItem("current_user");
  const initialUser = storedUser != undefined ? JSON.parse(storedUser) : null;
  const [curruser, setCurrUser] = useState(initialUser || null);
  const [loader, setLoader] = useState<boolean>(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>();
  const [loan, setLoan] = useState<loansType[]>();
  const [login, setLogin] = useState<boolean>(false);
  const [admin, setAdmin] = useState<adminLoginType>({
    admin_email: "",
    admin_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((admin) => ({
      ...admin,
      [name]: value,
    }));
  };

  const reducer = async (state: any, action: any) => {
    switch (action.type) {
      case "LOGIN": {
        setLoader(true);
        const { admin_email, admin_password } = admin;
        try {
          const response = await fetch(
            "https://shashank-techdomeloan.onrender.com" + "/admin/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                admin_email,
                admin_password,
              }),
            }
          );
          if (response) {
            const data = await response.json();
            if (data.success == true) {
              setLoader(false);
              setMessage(data.message);
              document.cookie = `user_access=${data.data.token}; path=/`;
              setCurrUser(data.data.admin);
              setLogin(data.success);
              return { ...state, data };
            } else {
              setLogin(data.success);
              setMessage(data.message);
              return { ...state, data };
            }
          }
        } catch (error) {
          console.log(error);
        }
        break;
      }
      case "LOGOUT": {
        const cookie = document.cookie;
        document.cookie = cookie + ";max-age=0";
        setCurrUser("");
        setLogin(false);
        return { ...state, success: false };
      }
      default:
        return state;
    }
  };

  const fetchLoanList = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://shashank-techdomeloan.onrender.com" + "/fetch/allloans",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        const data = await response.json();
        setLoader(false);
        if (data.success == true) {
          console.log(data);
          setLoan(data.data);
        } else {
          setMessage(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveLoan = async (loanId: string) => {
    setLoader(true);
    try {
      const response = await fetch(
        "https://shashank-techdomeloan.onrender.com" + "/update/loan/" + loanId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response) {
        const data = await response.json();
        console.log(data);
        setLoader(false);
        if (data.success == true) {
          setDataFetched(true);
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem("current_user", JSON.stringify(curruser));
  }, [curruser]);

  useEffect(() => {
    document.cookie ? setLogin(true) : setLogin(false);
  }, []);
  const [state, dispatch] = useReducer<any>(reducer, "");

  const info: adminContextvalue = {
    state,
    dispatch,
    handleChange,
    fetchLoanList,
    approveLoan,
    loan,
    message,
    admin,
    login,
    curruser,
    dataFetched,
    loader,
    setLoader,
  };
  return (
    <AdminContext.Provider value={info}>{props.children}</AdminContext.Provider>
  );
};
