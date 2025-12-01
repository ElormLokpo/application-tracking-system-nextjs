import ThemeProvider  from "./theme-provider"

export default function RootProvider({children}: {children: React.ReactNode}){
    return <div>
         <ThemeProvider>
        {children}
          </ThemeProvider>
        </div>
}