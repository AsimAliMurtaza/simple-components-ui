"use client";

import * as React from "react";

export type Theme = "dark" | "light" | "system";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  resolvedTheme: "dark",
});

export const useTheme = () => React.useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark");
  const [resolvedTheme, setResolvedTheme] = React.useState<"dark" | "light">("dark");

  React.useEffect(() => {
    const saved = localStorage.getItem("sc-ui-theme") as Theme | null;
    if (saved) {
      setThemeState(saved);
    }
  }, []);

  React.useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (t: Theme) => {
      let actual: "dark" | "light" = "dark";

      if (t === "system") {
        actual = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      } else {
        actual = t;
      }

      setResolvedTheme(actual);

      if (actual === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    applyTheme(theme);
    localStorage.setItem("sc-ui-theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
