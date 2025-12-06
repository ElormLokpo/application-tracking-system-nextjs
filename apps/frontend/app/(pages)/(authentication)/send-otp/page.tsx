"use client"

import { Input, Typography } from "@/app/components";
import { Button } from "@/app/components/shared/button";
import { ThemeToggle } from "@/app/components/shared/themeToggler";
import { useState } from "react";

export default function SendOtpPage() {
    const [email,setEmail] = useState<string>("")
  
    const submitHandler = async () => {
       
    }

    return (
        <div className="gap-5  flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4 flex items-center justify-center">
                    <ThemeToggle />
                </div>

                <div className="mb-5">
                    <div className="mb-1 text-center">
                        <Typography className="roboto-font" text="Reset Password" size={"2xl"} />
                    </div>
                    <div className="text-center">
                        <Typography className="font-light" text="Kindly enter email address of account." size={"sm"} />
                    </div>
                </div>

                <div className="w-[20rem]">

                    <div className="mb-5">
                        <Input onChange={(e) => setEmail(e.target.value)} inputType="textNForm" fieldType="text" placeholder="Enter email" name="email" variant="auth" />
                    </div>

                  

                    <div className="mb-1">
                        <Button isLoading={false} loadingText={<Typography className="dark:text-black font-semibold text-white" text="Sending verification code..." />} onClick={() => submitHandler()} type="button" variant="auth" className="w-full">
                            <Typography className="dark:text-black font-semibold text-white" text="Send verification code" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


