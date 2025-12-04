import { QueryProvider } from "./query-provider"
import { ReduxProvider } from "./redux-provider"
import ThemeProvider from "./theme-provider"
import { Toaster } from "sonner"

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return <div>
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  </div>
}