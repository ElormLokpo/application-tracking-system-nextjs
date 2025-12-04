import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Typography } from "./typography";


interface InputProps<T extends FieldValues> extends VariantProps<typeof inputVariants> {
    className?: string;
    inputType?: string;
    fieldType?: string;
    register?: UseFormRegister<T>,
    errors?: FieldErrors<T>
    label?: string,
    name: Path<T>,
    placeholder?: string,
}


const inputVariants = cva("",
    {
        variants: {
            variant: {
                regular: "",
                auth: "border text-xs px-2 py-3 w-full rounded-md"
            }
        },
        defaultVariants: {
            variant: "regular"
        }
    }
);


export const Input = <T extends FieldValues>({
    variant,
    className,
    inputType = "text",
    fieldType = "text",
    name,
    register,
    label,
    placeholder,
    errors
}: InputProps<T>) => {

    const inputTypes: Record<string, ReactNode> = {
        text: (
            <div>
                {label && <label className="mb-1" htmlFor={name}>
                    <Typography className="mb-1" text={label} size="xs" />
                </label>}
                <input
                    
                    placeholder={placeholder}
                    type={fieldType}
                    className={cn(inputVariants({ variant }), className, errors?.[name] && "border-red-500")}
                    {...(register ? register(name) : {})} />

                {
                    errors?.[name] && (
                        <Typography text={errors?.[name].message?.toString()} size="xs" className="text-red-500 dark:text-red-400" />
                    )
                }
            </div>
        )
    }
    return inputTypes[inputType]
}
