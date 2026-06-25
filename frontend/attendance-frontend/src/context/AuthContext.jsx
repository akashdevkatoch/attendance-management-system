import {
  createContext,
  useState
} from "react";

export const AuthContext =
  createContext();

export function AuthProvider(
  { children }
) {
  const [token, setToken] =
    useState(
      localStorage.getItem(
        "token"
      )
    );

  const login = (
    jwt,
    role
  ) => {
    localStorage.setItem(
      "token",
      jwt
    );

    localStorage.setItem(
      "role",
      role
    );

    setToken(jwt);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}