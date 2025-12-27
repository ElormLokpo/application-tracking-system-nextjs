

import { ThemeToggle } from "@/app/components/shared/themeToggler";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="2xl:mx-[27rem] my-[5rem] gap-5 xl:grid xl:grid-cols-2">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4 flex items-center justify-center">
                    <ThemeToggle />
                </div>
                {children}
            </div>
            <div className="hidden xl:block">
                <Image className="rounded-lg" src="/auth.jpg" alt="auth" width={500} height={500} />
            </div>
        </div>
    )
}