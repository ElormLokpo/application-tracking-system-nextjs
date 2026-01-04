"use client";

import { ThemeToggle } from "@/app/components/shared/themeToggler";
import Image from "next/image";
import { motion as m } from "motion/react";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="2xl:mx-[27rem] my-[5rem] gap-5 xl:grid xl:grid-cols-2">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center justify-center">
          <ThemeToggle />
        </div>
        {children}
      </div>
      <m.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        exit={{ opacity: 0, x: -40 }}
        className="hidden xl:block"
      >
        <Image
          className="rounded-lg"
          src="/auth.jpg"
          alt="auth"
          width={500}
          height={500}
        />
      </m.div>
    </div>
  );
}
