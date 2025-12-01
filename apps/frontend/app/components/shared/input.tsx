import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";
import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Typography } from "./typography";


interface InputProps extends VariantProps<typeof inputVariants> {
    className?: string;
    inputType?: string;
    fieldType?: string;
    register?: UseFormRegister<FieldValues>,
    errors?: FieldErrors<FieldValues>
    label?: string,
    name: Path<FieldValues>,
    placeholder?: string
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


export const Input = ({
    variant,
    className,
    inputType = "text",
    fieldType = "text",
    name,
    register,
    label,
    placeholder,
    errors
}: InputProps) => {

    const inputTypes: Record<string, ReactNode> = {
        text: (
            <div>
                {label && <label className="mb-1" htmlFor={name}>
                    <Typography className="mb-1" text={label} size="xs" />
                </label>}
                <input
                    placeholder={placeholder
                        
                    }
                    type={fieldType}
                    className={cn(inputVariants({ variant }), className)}
                    {...(register ? register(name) : {})} />
            </div>
        )
    }
    return inputTypes[inputType]
}
