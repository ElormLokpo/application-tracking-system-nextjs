"use client"

import { Input, Typography } from "@/app/components"
import { Button } from "@/app/components/shared/button"
import { ThemeToggle } from "@/app/components/shared/themeToggler"
import { useSendVerificationEmail } from "@/app/hooks/authHook"
import { ReactNode, useState } from "react"
import { BsFillPatchCheckFill } from "react-icons/bs";



export const VerifyAccountPage = () => {
    const [steps, setSteps] = useState(1)


    const verificationSteps: Record<number, ReactNode> = {
        1: <VerifyAccountComponent setSteps={setSteps} />,
        2: <VerifyLinkSentSuccessComponent />
    }




    return verificationSteps[steps]
}



const VerifyAccountComponent = ({setSteps}: {setSteps: (steps: number) => void}) => {
    const [email, setEmail] = useState<string>("")

    const { mutate: sendVerificationEmail, isPending } = useSendVerificationEmail()

    const submitHandler = async () => {
        sendVerificationEmail({ email })
        setSteps(2)
    }

    //Kindly remember to rethink the verfication logic....the email should be taken from redux state. Else user can 
    //verify with any email.


    return <div className="gap-5  flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex items-center justify-center">
                <ThemeToggle />
            </div>

            <div className="mb-5">
                <div className="mb-1 text-center">
                    <Typography className="roboto-font" text="Verify Account" size={"2xl"} />
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
                    <Button isDisabled={isPending || !email} isLoading={isPending} loadingText={<Typography className="dark:text-black font-semibold text-white" text="Sending verification link..." />} onClick={() => submitHandler()} type="button" variant="auth" className="w-full">
                        <Typography className="dark:text-black font-semibold text-white" text="Send verification link" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
}


const VerifyLinkSentSuccessComponent = () => {
    return <div className="gap-5  flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
            <div className="mb-4 flex items-center justify-center">
                <ThemeToggle />
            </div>

            <div className="mb-5">
                <div className="mb-1 text-center flex gap-2 items-center">
                    <BsFillPatchCheckFill className="text-green-500" size={24} />
                    <Typography className="roboto-font" text="Verify Email Sent Successfully" size={"2xl"} />
                </div>
                <div className="text-center">
                    <Typography className="font-light" text="Kindly check your email for verification link." size={"sm"} />
                </div>
            </div>

           
        </div>
    </div>
}



export default VerifyAccountPage;