"use client"

import { Input, Typography } from "@/app/components";
import { Button } from "@/app/components/shared/button";
import { ThemeToggle } from "@/app/components/shared/themeToggler";
import { JSX } from "react";
import { BsBriefcase } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux";
import { useRegister } from "@/app/hooks/authHook";
import { useRouter } from "next/navigation";
import { Role } from "../../../../../../packages/types";
import { clearRegisterData } from "@/app/redux/slices/registerSlice";


export default function RolePage() {
    const [fullname, setFullname] = useState<string>("");
    const [currentRole, setCurrentRole] = useState<Role>(Role.HIRING_MANAGER);
    const router = useRouter();
    const dispatch = useDispatch();

    const roleData = [
        {
            icon: <BsBriefcase />,
            title: "Hiring Manager",
            value: Role.HIRING_MANAGER
        },
        {
            icon: <FaRegUser />,
            title: "Job Seeker",
            value: Role.APPLICANT
        }
    ]
    const registerData = useSelector((state: RootState) => state.register)
    const { mutate: registerUser, isPending } = useRegister();

   
    useEffect(() => {
        if (!registerData.email || !registerData.password) {
            router.push("/auth");
        }
    }, [registerData.email, registerData.password, router]);

    const submitHandler = async () => {
        const finalRegisterData = {
            ...registerData,
            role: currentRole,
            fullname: fullname
        }
        
        if (finalRegisterData.role || finalRegisterData.fullname) {
            await registerUser(finalRegisterData)
        }

        dispatch(clearRegisterData())

    }

    return (
        <div className="gap-5  flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-4 flex items-center justify-center">
                    <ThemeToggle />
                </div>

                <div className="mb-5">
                    <div className="mb-1 text-center">
                        <Typography className="roboto-font" text="Create an account" size={"2xl"} />
                    </div>
                    <div className="text-center">
                        <Typography className="font-light" text="Kindly pick a role." size={"sm"} />
                    </div>
                </div>

                <div className="w-[20rem]">

                    <div className="mb-5">
                        <Input onChange={(e) => setFullname(e.target.value)} inputType="textNForm" fieldType="fullname" placeholder="Enter fullname" name="fullname" variant="auth" />
                    </div>

                    <div className="mb-5 grid grid-cols-2 gap-3">
                        {
                            roleData.map((role) => (
                                <RoleCard currentRole={currentRole} roleValue={role.value} setCurrentRole={setCurrentRole} key={role.value} icon={role.icon} title={role.title} />
                            ))
                        }

                    </div>

                    <div className="mb-1">
                        <Button isLoading={isPending} loadingText={<Typography className="dark:text-black font-semibold text-white" text="Creating account..." />} onClick={() => submitHandler()} type="button" variant="auth" className="w-full">
                            <Typography className="dark:text-black font-semibold text-white" text="Create Account" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const RoleCard = ({ currentRole, setCurrentRole, roleValue, icon, title }: { currentRole: Role, setCurrentRole: React.Dispatch<React.SetStateAction<Role>>, roleValue: Role, icon: JSX.Element, title: string }) => {


    const defaultStyle = "w-[auto] hover:dark:bg-stone-800 hover:cursor-pointer hover:bg-stone-100 flex items-center gap-2 flex-col border-stone-900  dark:border-stone-200 p-5 rounded-md";
    return <button type="button" onClick={() => setCurrentRole(roleValue)} className={`${currentRole === roleValue ? `${defaultStyle} border-3` : `${defaultStyle} border-1`}`}>
        <div>
            {icon}
        </div>
        <Typography size={"sm"} className="dark:text-white text-black" text={title} />
    </button>
}