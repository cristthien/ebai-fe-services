"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  username: string;
  role: string;
};

const AppContext = createContext<{
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean | null;
  setUser: (user: User | null, token?: string) => void;
  logout: () => void;
}>({
  user: null,
  accessToken: null,
  isAuthenticated: null,
  setUser: () => {},
  logout: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUserState] = useState<User | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const syncAuthentication = useCallback(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    try {
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUserState(parsedUser);
        setAccessTokenState(storedToken);
        setIsAuthenticated(true);
      } else {
        setUserState(null);
        setAccessTokenState(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      setUserState(null);
      setAccessTokenState(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Sync với localStorage khi component mount
  useEffect(() => {
    syncAuthentication();
  }, [syncAuthentication]);

  // Set user và token
  const setUser = useCallback((user: User | null, token?: string) => {
    if (user && token) {
      setUserState(user);
      setAccessTokenState(token);
      setIsAuthenticated(true);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("access_token", token);
    } else {
      setUserState(null);
      setAccessTokenState(null);
      setIsAuthenticated(false);

      localStorage.removeItem("user");
      localStorage.removeItem("access_token");
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    console.log("Logged out successfully!");
  }, [setUser]);

  return (
    <AppContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        setUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
