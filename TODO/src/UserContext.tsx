import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContextProps {
  children: ReactNode;
}

export interface UserType {
  role: string;
  name: string;
}

interface UserContextValue {
  isUser: boolean;
  setIsUser: Dispatch<SetStateAction<boolean>>;
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

const UserContext = createContext<UserContextValue>({
  isUser: false,
  setIsUser: () => {},
  user: { role: "", name: "" },
  setUser: () => {},
});

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const storedUser = localStorage.getItem("isUser") === "true";

  const [isUser, setIsUser] = useState(storedUser);
  const [user, setUser] = useState({
    role: "",
    name: "",
  });

  useEffect(() => {
    localStorage.setItem("isUser", `${isUser}`);
  }, [isUser]);

  const contextValue: UserContextValue = {
    user,
    setUser,
    isUser,
    setIsUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
