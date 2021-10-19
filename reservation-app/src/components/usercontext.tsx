import React, { useContext, useState } from 'react';

type UserContext = {
    user: string;
    setUser: (user: "" ) => void;
    authenticated: boolean;
    setAuthenticated: (authenticated: boolean) => void;
    admin: boolean;
    setAdmin: (admin: boolean) => void;
  };
  
// eslint-disable-next-line  
const UserContext = React.createContext<Partial<UserContext>>({});

export const useUser = () => useContext(UserContext);

type UserContextProps = {
    children: React.ReactNode;
  };

export const UserProvider: React.FunctionComponent<UserContextProps> = ({children}) => {
    const [user, setUser] = useState("");
    const [admin, setAdmin] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <UserContext.Provider
          value={{
            user,
            setUser,
            admin,
            setAdmin,
            authenticated,
            setAuthenticated
          }}
        >
          {children}
        </UserContext.Provider>
      );
}