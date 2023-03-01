import { createContext, ReactNode, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

interface AuthContextValue {
  currentUser: User | null;
  login: () => void;
}

// Use `Context` to share data that can be considered "global"
export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  login: () => {
    console.warn("login func not implemented");
  },
});

interface AuthContextProviderProps {
  children: ReactNode;
}

// Use `Context.Provider` to keep track of `Context` changes
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedValue = localStorage.getItem("user");
    return storedValue ? JSON.parse(storedValue) : null;
  });

  const login = () => {
    setCurrentUser({
      id: 1,
      name: "Elon Musk",
      profilePic:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    });
  };

  // Use `useEffect` hook to save the `currentUser` value to the `localStorage`
  // whenever it changes.
  // `[currentUser]` array of dependencies tells React to re-run the effect only
  // when the dependencies change.
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // Return a `Provider` component from `AuthContext`.
  // `children` prop is used to render the child components wrapped by the
  // `Provider`. This makes the `currentUser` value and `login` function
  // available to all the child components that are wrapped by the `Provider`
  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
