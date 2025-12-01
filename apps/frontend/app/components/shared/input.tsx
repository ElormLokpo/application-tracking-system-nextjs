import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/app/lib/utils";
import { ReactNode } from "react";


interface InputProps extends VariantProps<typeof inputVariants>{
    className?:string;
    inputType:string;
}


const inputVariants = cva("",
    {variants:{
        variant:{
            regular:""
        }
    }, 
    defaultVariants:{
        variant:"regular"
    }
}
);





export const Input = ({variant, className, inputType="text"}:InputProps)=>{
   
   const inputTypes:Record<string, ReactNode> = {
    text: (
        <div>
            <input className={cn(inputVariants({variant}), className)} />
        </div>
    )
}
    return inputTypes[inputType]
}
