import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextValue {
  darkMode: boolean;
  toggleTheme: () => void;
}

// Use `Context` to share data that can be considered "global"
export const DarkModeContext = createContext<DarkModeContextValue>({
  darkMode: false,
  toggleTheme: () => {
    console.warn("toggleTheme func not implemented");
  },
});

interface DarkModeContextProviderProps {
  children: ReactNode;
}

// Use `Context.Provider` to keep track of `Context` changes
export const DarkModeContextProvider = ({
  children,
}: DarkModeContextProviderProps) => {
  // `darkMode` state variable & `setDarkMode` func to update that variable
  // `useState` hook initializes the `darkMode` variable with a default value
  const [darkMode, setDarkMode] = useState<boolean>(
    // `JSON.parse` is used to convert the string value retrieved from
    // `localStorage` to a `boolean`. If `localStorage` value is `null` or
    // `undefined`, it defaults to `false`
    JSON.parse(localStorage.getItem("darkMode") || "false")
  );

  // `toggleTheme` is defined after `darkMode` state variable above so it will
  // keep tracks of `darkMode` value changes. Otherwise, it'll always be `false`
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Use `useEffect` hook to save the `darkMode` value to the `localStorage`
  // whenever it changes.
  // `[darkMode]` array of dependencies tells React to re-run the effect only
  // when the dependencies change.
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Return a `Provider` component from `DarkModeContext`.
  // `children` prop is used to render the child components wrapped by the
  // `Provider`. This makes the `darkMode` value and `toggleTheme` function
  // available to all the child components that are wrapped by the `Provider`
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};
