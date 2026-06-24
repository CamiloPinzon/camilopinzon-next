"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { calculateThemeProgress } from "@/lib/theme/calculate-progress";

export type ThemeMode = "light" | "dark" | "dynamic";

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  progress: number;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("dynamic");
  const [progress, setProgress] = useState<number>(0);

  // Read initial state from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    if (savedMode) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeModeState(savedMode);
    }
  }, []);

  const calculateProgress = (mode: ThemeMode) => {
    if (mode === "dark") return 1;
    if (mode === "light") return 0;
    const now = new Date();
    return calculateThemeProgress(now.getHours() + now.getMinutes() / 60);
  };

  useEffect(() => {
    const updateTheme = () => {
      const newProgress = calculateProgress(themeMode);
      setProgress(newProgress);
      document.documentElement.style.setProperty("--theme-progress", newProgress.toString());
    };

    updateTheme();

    if (themeMode === "dynamic") {
      const interval = setInterval(updateTheme, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem("theme-mode", mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, progress }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
