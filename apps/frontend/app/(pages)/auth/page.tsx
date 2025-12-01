"use client"
import { Typography } from "@/app/components";
import { Input } from "@/app/components/shared/input";
import { Button } from "@/app/components/shared/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false)
    const { register, formState: { errors }, handleSubmit } = useForm();


    const submitHandler = (data: any) => { //remember to change any type

    }

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="mb-5">
                <div className="mb-1 text-center">
                    <Typography className="roboto-font" text={isLogin ? "Log into account" : "Create an account"} size={"2xl"} />
                </div>
                <div className="text-center">
                    <Typography className="font-light" text="The AI for hiring managers." size={"sm"} />
                </div>
            </div>

            <div className="w-[20rem]">
                <form onSubmit={handleSubmit(submitHandler)}>

                    <div className="mb-2">
                        <Input placeholder="Enter email" name="name" register={register} errors={errors} variant="auth" />
                    </div>

                    <div className="mb-2">
                        <Input placeholder="Enter password" name="name" register={register} errors={errors} variant="auth" />
                    </div>

                    <div className="mb-4">
                        {isLogin && <button><Typography className="text-center" text="Forgot password?" size="xs" /></button>}
                    </div>

                    <div className="mb-1">
                        <Button variant="auth" className="w-full">
                            {isLogin ? <Typography className="dark:text-black font-semibold text-white" text="Login" /> : <Typography className="dark:text-black text-white" text="Register" />}
                        </Button>
                    </div>

                    <div className="mb-4 text-center">
                        <button className="hover:cursor-pointer" onClick={() => setIsLogin(!isLogin)}><Typography className="text-center underline" text={isLogin ? "Don't have an account?" : "Already have an account?"} size="xs" /></button>
                    </div>

                    <div>
                        <Button variant="google" className="w-full flex items-center justify-center">
                            <div className="flex gap-2 items-center">
                                <FcGoogle />
                                <Typography className="font-semibold dark:text-white" text="Continue with Google" />
                            </div>
                        </Button>
                    </div>

                </form>

            </div>





        </div>
    )
}