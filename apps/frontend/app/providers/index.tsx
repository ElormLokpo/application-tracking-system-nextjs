import { ReactNode } from "react";
import GoogleProvider from "./google-provider";
import { QueryProvider } from "./query-provider";
import { ReduxProvider } from "./redux-provider";
import ThemeProvider from "./theme-provider";
import { Toaster } from "sonner";

export default function RootProvider({ children }: { children: ReactNode }) {
  return (
    <div>
      <ReduxProvider>
        <QueryProvider>
          <ThemeProvider>
            <GoogleProvider>
              <Toaster />
              {children}
            </GoogleProvider>
          </ThemeProvider>
        </QueryProvider>
      </ReduxProvider>
    </div>
  );
}
