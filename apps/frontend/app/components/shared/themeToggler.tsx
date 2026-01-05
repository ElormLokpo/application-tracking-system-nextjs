"use client";

import { useEffect } from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FiMoon } from "react-icons/fi";
import { useTheme } from "@/app/hooks";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const root = document.documentElement.classList;
    root.remove("dark", "light");
    root.add(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="text-xs border p-2 rounded-full hover:cursor-pointer"
      onClick={handleThemeToggle}
    >
      {theme === "dark" ? <TiWeatherPartlySunny /> : <FiMoon />}
    </button>
  );
}
