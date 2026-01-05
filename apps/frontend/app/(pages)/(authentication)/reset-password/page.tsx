"use client";

import { Input, Typography } from "@/app/components";
import { Button } from "@/app/components/shared/button";
import { ThemeToggle } from "@/app/components/shared/themeToggler";
import { ROUTES } from "@/app/constants";
import {
  useSendOtp,
  useUpdatePassword,
  useValidateOtp,
} from "@/app/hooks/authHook";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { motion as m } from "motion/react";

export default function ResetPasswordPage() {
  const [steps, setSteps] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  const stepsRecord: Record<number, JSX.Element> = {
    1: (
      <SendOtpComponent email={email} setEmail={setEmail} setSteps={setSteps} />
    ),
    2: <ValidateOtpComponent email={email} setSteps={setSteps} />,
    3: <UpdatePasswordComponent email={email} />,
  };

  return stepsRecord[steps];
}

interface ISendOtpComponent {
  email: string;
  setEmail: (email: string) => void;
  setSteps: (steps: number) => void;
}

const SendOtpComponent = ({ email, setEmail, setSteps }: ISendOtpComponent) => {
  const { mutate: sendOtp, isPending } = useSendOtp();

  const submitHandler = async () => {
    sendOtp({ email });
    setSteps(2);
  };

  return (
    <div className="gap-5  flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center justify-center">
          <ThemeToggle />
        </div>

        <div className="mb-5">
          <div className="mb-1 text-center">
            <Typography
              className="roboto-font"
              text="Reset Password"
              size={"2xl"}
            />
          </div>
          <div className="text-center">
            <Typography
              className="font-light"
              text="Kindly enter email address of account."
              size={"sm"}
            />
          </div>
        </div>

        <div className="w-[20rem]">
          <div className="mb-5">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              inputType="textNForm"
              fieldType="text"
              placeholder="Enter email"
              name="email"
              variant="auth"
            />
          </div>

          <div className="mb-1">
            <Button
              isDisabled={isPending || !email}
              isLoading={isPending}
              loadingText={
                <Typography
                  className="dark:text-black font-semibold text-white"
                  text="Sending verification code..."
                />
              }
              onClick={() => submitHandler()}
              type="button"
              variant="auth"
              className="w-full"
            >
              <Typography
                className="dark:text-black font-semibold text-white"
                text="Send verification code"
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface IValidateOtpComponent {
  email: string;
  setSteps: (steps: number) => void;
}

const ValidateOtpComponent = ({ email, setSteps }: IValidateOtpComponent) => {
  const [otp, setOtp] = useState<string>("");

  const { mutate: validateOtp, isPending } = useValidateOtp();

  const submitHandler = async () => {
    validateOtp({ email, otp });
    setSteps(3);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      exit={{ opacity: 0, y: -40 }}
      className="gap-5  flex items-center justify-center h-screen"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center justify-center">
          <ThemeToggle />
        </div>

        <div className="mb-5">
          <div className="mb-1 text-center">
            <Typography
              className="roboto-font"
              text="Reset Password"
              size={"2xl"}
            />
          </div>
          <div className="text-center">
            <Typography
              className="font-light"
              text="Kindly enter code sent to your email."
              size={"sm"}
            />
          </div>
        </div>

        <div className="w-[20rem]">
          <div className="mb-5">
            <Input
              maxLength={6}
              className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              onChange={(e) => setOtp(e.target.value)}
              inputType="otp"
              fieldType="text"
              placeholder="Enter code sent to your email"
              name="otp"
              variant="auth"
            />
          </div>

          <div className="mb-1">
            <Button
              isDisabled={isPending}
              isLoading={isPending}
              loadingText={
                <Typography
                  className="dark:text-black font-semibold text-white"
                  text="Validating code..."
                />
              }
              onClick={() => submitHandler()}
              type="button"
              variant="auth"
              className="w-full"
            >
              <Typography
                className="dark:text-black font-semibold text-white"
                text="Validate code"
              />
            </Button>
          </div>
        </div>
      </div>
    </m.div>
  );
};

interface IUpdatePasswordComponent {
  email: string;
}

const UpdatePasswordComponent = ({ email }: IUpdatePasswordComponent) => {
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const submitHandler = async () => {
    updatePassword({ email, password });
    router.push(ROUTES.AUTH);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      exit={{ opacity: 0, y: -40 }}
      className="gap-5  flex items-center justify-center h-screen"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center justify-center">
          <ThemeToggle />
        </div>

        <div className="mb-5">
          <div className="mb-1 text-center">
            <Typography
              className="roboto-font"
              text="Reset Password"
              size={"2xl"}
            />
          </div>
          <div className="text-center">
            <Typography
              className="font-light"
              text="Kindly enter new password."
              size={"sm"}
            />
          </div>
        </div>

        <div className="w-[20rem]">
          <div className="mb-5">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              inputType="textNForm"
              fieldType="password"
              placeholder="Enter password"
              name="password"
              variant="auth"
            />
          </div>

          <div className="mb-1">
            <Button
              isDisabled={isPending || !password}
              isLoading={isPending}
              loadingText={
                <Typography
                  className="dark:text-black font-semibold text-white"
                  text="Resetting password..."
                />
              }
              onClick={() => submitHandler()}
              type="button"
              variant="auth"
              className="w-full"
            >
              <Typography
                className="dark:text-black font-semibold text-white"
                text="Reset Password"
              />
            </Button>
          </div>
        </div>
      </div>
    </m.div>
  );
};
