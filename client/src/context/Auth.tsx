import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

interface LoginInputs {
  username: string;
  password: string;
}

interface AuthContextValue {
  currentUser: User | null;
  login: (inputs: LoginInputs) => void;
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

  const login = async (inputs: LoginInputs) => {
    /* // For testing
    setCurrentUser({
      id: 1,
      name: "Elon Musk",
      profilePic:
        "https://images.pexels.com/photos/1227511/pexels-photo-1227511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    });
    */

    // Send a POST request to the URL using the `axios` library, passing the
    // `inputs` object as the request body & including the `withCredentials`
    // option in the request configuration.
    // The response is stored in the `res` variable, which is declared as type
    // `AxiosResponse<LoginResponse>`
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        // Set `withCredentials` to `true` to include cookies in cross-site
        // HTTP requests. The `server` can read the authentication cookies and
        // verify the user's credentials & create a session for them.
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
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
