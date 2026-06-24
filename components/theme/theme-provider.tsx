"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

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
    
    // Dynamic mode: Calculate based on time
    const now = new Date();
    const hours = now.getHours() + now.getMinutes() / 60;
    
    // Using a cosine wave where 12 PM (noon) is 0 (pure light) and 12 AM (midnight) is 1 (pure dark).
    return (Math.cos((hours / 24) * 2 * Math.PI) + 1) / 2;
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
