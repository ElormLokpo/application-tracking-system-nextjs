import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import { ChangeEvent, ReactNode } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Typography } from "./typography";

interface InputProps<T extends FieldValues>
  extends VariantProps<typeof inputVariants> {
  className?: string;
  inputType?: string;
  fieldType?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  label?: string;
  name: Path<T>;
  placeholder?: string;
  // eslint-disable-next-line no-undef
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const inputVariants = cva("", {
  variants: {
    variant: {
      regular: "",
      auth: "border text-xs px-2 py-3 w-full rounded-md",
    },
  },
  defaultVariants: {
    variant: "regular",
  },
});

export const Input = <T extends FieldValues>({
  variant,
  className,
  inputType = "text",
  fieldType = "text",
  name,
  register,
  label,
  placeholder,
  errors,
  onChange,
  maxLength,
}: InputProps<T>) => {
  const inputTypes: Record<string, ReactNode> = {
    text: (
      <div>
        {label && (
          <label className="mb-1" htmlFor={name}>
            <Typography className="mb-1" text={label} size="xs" />
          </label>
        )}
        <input
          placeholder={placeholder}
          type={fieldType}
          className={cn(
            inputVariants({ variant }),
            className,
            errors?.[name] && "border-red-500",
          )}
          {...(register ? register(name) : {})}
        />

        {errors?.[name] && (
          <Typography
            text={errors?.[name].message?.toString()}
            size="xs"
            className="text-red-500 dark:text-red-400"
          />
        )}
      </div>
    ),
    textNForm: (
      <div>
        {label && (
          <label className="mb-1" htmlFor={name}>
            <Typography className="mb-1" text={label} size="xs" />
          </label>
        )}
        <input
          onChange={(e) => onChange?.(e)}
          placeholder={placeholder}
          type={fieldType}
          className={cn(inputVariants({ variant }), className)}
        />
      </div>
    ),
    otp: (
      <div>
        {label && (
          <label className="mb-1" htmlFor={name}>
            <Typography className="mb-1" text={label} size="xs" />
          </label>
        )}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={maxLength}
          placeholder={placeholder}
          className={cn(
            inputVariants({ variant }),
            className,
            errors?.[name] && "border-red-500",
          )}
          {...(register ? register(name) : { onChange })}
        />

        {errors?.[name] && (
          <Typography
            text={errors?.[name].message?.toString()}
            size="xs"
            className="text-red-500 dark:text-red-400"
          />
        )}
      </div>
    ),
  };
  return inputTypes[inputType];
};
