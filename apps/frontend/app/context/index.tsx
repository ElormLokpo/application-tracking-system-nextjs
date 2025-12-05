"use client"
import {createContext} from "react"


interface IThemeContext {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<IThemeContext|undefined>(undefined);


