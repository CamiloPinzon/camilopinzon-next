"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Sparkles } from "lucide-react";
import styles from "./theme-selector.module.scss";

export default function ThemeSelector() {
  const { themeMode, setThemeMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a hidden skeleton
    return (
      <div className={styles.pillSwitcher} style={{ visibility: "hidden" }}>
        <button className={styles.pillItem}><Sun /></button>
        <button className={styles.pillItem}><Sparkles /></button>
        <button className={styles.pillItem}><Moon /></button>
      </div>
    );
  }

  return (
    <div className={styles.pillSwitcher} aria-label="Seleccionar tema">
      <button
        className={`${styles.pillItem} ${themeMode === "light" ? styles.active : ""}`}
        onClick={() => setThemeMode("light")}
        aria-label="Modo claro"
        title="Modo claro"
      >
        <Sun />
      </button>
      <button
        className={`${styles.pillItem} ${themeMode === "dynamic" ? styles.active : ""}`}
        onClick={() => setThemeMode("dynamic")}
        aria-label="Modo dinámico (por hora)"
        title="Modo dinámico (por hora)"
      >
        <Sparkles />
      </button>
      <button
        className={`${styles.pillItem} ${themeMode === "dark" ? styles.active : ""}`}
        onClick={() => setThemeMode("dark")}
        aria-label="Modo oscuro"
        title="Modo oscuro"
      >
        <Moon />
      </button>
    </div>
  );
}
