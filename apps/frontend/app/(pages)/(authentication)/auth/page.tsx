"use client"
import { Typography } from "@/app/components";
import { Input } from "@/app/components/shared/input";
import { Button } from "@/app/components/shared/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthUserSchemaType, AuthUserSchema } from "../../../../../../packages/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/app/hooks/authHook";
import { useDispatch, useSelector } from "react-redux";
import { storeRegisterData } from "@/app/redux/slices/registerSlice";
import { AppDispatch, RootState } from "@/app/redux";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/constants";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(false)
    const { register, formState: { errors }, handleSubmit, setError } = useForm({
        resolver: zodResolver(AuthUserSchema)
    });

    const dispatch: AppDispatch = useDispatch()
    const router = useRouter();

    const { mutateAsync: loginUser, isPending } = useLogin()

    const registerData = useSelector((state: RootState) => state.register)


    const submitHandler = async (data: AuthUserSchemaType) => {
        if (isLogin) {
            const loginResponse = await loginUser(data);
            if ('status' in loginResponse && loginResponse.status === "error") {
                setError("password", { type: "manual", message: loginResponse.message })
            }
        }
        else {
            dispatch(storeRegisterData({ ...registerData, ...data }))
            router.push(ROUTES.ROLE)
        }
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
                        <Input fieldType="email" placeholder="Enter email" name="email" register={register} errors={errors} variant="auth" />
                    </div>

                    <div className="mb-2">
                        <Input fieldType="password" placeholder="Enter password" name="password" register={register} errors={errors} variant="auth" />
                    </div>

                    <div className="mb-4">
                        {isLogin && <button type="button"><Typography className="text-center" text="Forgot password?" size="xs" /></button>}
                    </div>

                    <div className="mb-1">
                        <Button isLoading={isPending} loadingText={isLogin ? <Typography className="dark:text-black font-semibold text-white" text="Logging into account..." /> : <Typography className="dark:text-black text-white" text="Registering account..." />} type="submit" variant="auth" className="w-full">
                            {isLogin ? <Typography className="dark:text-black font-semibold text-white" text="Login" /> : <Typography className="dark:text-black text-white" text="Register" />}
                        </Button>
                    </div>

                    <div className="mb-4 text-center">
                        <button type="button" className="hover:cursor-pointer" onClick={() => setIsLogin(!isLogin)}><Typography className="text-center underline" text={isLogin ? "Don't have an account?" : "Already have an account?"} size="xs" /></button>
                    </div>

                    <div>
                        <Button type="button" variant="google" className="w-full flex items-center justify-center">
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