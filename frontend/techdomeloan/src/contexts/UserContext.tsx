import { createContext, useReducer, useState, useEffect } from "react";
import { userContextvalue, userLoginType } from "../Types/dto";

export const UserContext = createContext<userContextvalue | null>(null);

export const UserauthProvider = (props: any) => {
  const storedUser = localStorage.getItem("current_user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [curruser, setCurrUser] = useState(initialUser || null);
  const [message, setMessage] = useState<string | undefined>();
  const [loader, setLoader] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  const [user, setUser] = useState<userLoginType>({
    user_email: "",
    user_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const reducer = async (state: any, action: any) => {
    switch (action.type) {
      case "LOGIN": {
        const { user_email, user_password } = user;
        setLoader(true);
        try {
          const response = await fetch(
            "http://localhost:8000" + "/user/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_email,
                user_password,
              }),
            }
          );
          if (response) {
            const data = await response.json();
            setLoader(false);
            if (data.success == true) {
              setMessage(data.message);
              document.cookie = `user_access=${data.data.token}; path=/`;
              setCurrUser(data.data.user);
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

  useEffect(() => {
    localStorage.setItem("current_user", JSON.stringify(curruser));
  }, [curruser]);

  useEffect(() => {
    document.cookie ? setLogin(true) : setLogin(false);
  }, []);
  const [state, dispatch] = useReducer<any>(reducer, "");

  const info: userContextvalue = {
    state,
    dispatch,
    handleChange,
    message,
    user,
    login,
    curruser,
    loader,
    setLoader,
  };
  return (
    <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
  );
};
