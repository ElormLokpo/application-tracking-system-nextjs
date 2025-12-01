

import { ThemeToggle } from "@/app/components/shared/themeToggler";


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-[30rem] my-[10rem] grid grid-cols-2 dark:bg-stone-900 bg-stone-100">
            <div>
                <div>
                    <ThemeToggle />
                </div>
                {children}
            </div>
            <div className="bg-red-500">
                a
            </div>
        </div>
    )
}