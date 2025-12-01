import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";

interface ITypographyProps extends VariantProps<typeof typographyVariants>{
  
    className?: string;
    text:string, 
}

const typographyVariants = cva(
    "text-stone-900 dark:text-stone-100",
    {
        variants:{
            variant:{}
        }, 
        defaultVariants:{}
    }
);


export const Typography = ({variant, className, text}:ITypographyProps)=>{
    return <span className={cn(typographyVariants({variant}), className)} >{text}</span>
}

