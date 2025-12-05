import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { ReactElement } from "react";

interface ITypographyProps extends VariantProps<typeof typographyVariants> {

    className?: string;
    text: string | ReactElement | unknown,
}

const typographyVariants = cva(
    "text-stone-900 dark:text-stone-100",
    {
        variants: {
            variant: {},
            size: {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-md",
                lg: "text-lg",
                xl: "text-xl",
                "2xl": "text-2xl",
                "3xl": "text-3xl",
                "4xl": "text-4xl",
                "5xl": "text-5xl",
                "6xl": "text-6xl",
                "7xl": "text-7xl",
                "8xl": "text-8xl",
                "9xl": "text-9xl",
            }
        },
        defaultVariants: {
            size: "xs"
        }
    }
);


export const Typography = ({ variant, className, text, size }: ITypographyProps) => {
    return <span className={cn(typographyVariants({ variant, size }), className)} >{text as string}</span>
}

