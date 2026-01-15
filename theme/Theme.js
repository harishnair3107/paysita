import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors, darkColors } from "./colors";

export const ThemeContext = createContext();

const THEME_KEY = "APP_THEME_MODE";

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const [isReady, setIsReady] = useState(false);

  /* 🔹 Load saved theme on app start */
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_KEY);
        if (savedMode) {
          setMode(savedMode);
        }
      } catch (e) {
        console.log("Failed to load theme", e);
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  /* 🔹 Save theme whenever it changes */
  useEffect(() => {
    if (!isReady) return;

    AsyncStorage.setItem(THEME_KEY, mode).catch(err =>
      console.log("Failed to save theme", err)
    );
  }, [mode, isReady]);

  const colors = mode === "dark" ? darkColors : lightColors;

  if (!isReady) return null; // ⛔ prevents flicker on startup

  return (
    <ThemeContext.Provider value={{ colors, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
