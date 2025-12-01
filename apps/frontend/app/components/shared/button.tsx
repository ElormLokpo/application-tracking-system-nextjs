import { cn } from "@/app/lib/utils";
import {cva, type VariantProps} from "class-variance-authority";
import { ReactNode } from "react";


interface ButtonProps extends VariantProps<typeof buttonVariants> {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}

const buttonVariants = cva("", {
    variants: {
        variant: {
            default: "",
            auth: "dark:bg-white bg-stone-900 py-3.5 rounded-md text-xs dark:text-black hover:bg-stone-700 hover:cursor-pointer hover:dark:bg-stone-100  text-white",
            google: "border-2 border-stone-900 dark:border-none hover:bg-stone-100  dark:bg-stone-900 py-3.5 rounded-md text-xs  dark:hover:bg-stone-700 hover:cursor-pointer dark:text-white",

        }
    },
    defaultVariants: {
        variant: "default"
    }
})

export const Button = ({variant, className, children, onClick}: ButtonProps) => {
    return (
        <button className={cn(buttonVariants({variant}), className)} onClick={onClick}>
            {children}
        </button>
    )
}