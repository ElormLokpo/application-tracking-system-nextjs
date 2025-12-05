"use client"

import { ThemeContext } from "@/app/context";
import { useState } from "react";


export default function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState("dark");
 
    return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>
}