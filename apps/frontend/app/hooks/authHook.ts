import { AuthUserSchemaType, RegisterUserSchemaType } from "../../../../packages/types";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance as axios } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { setToken } from "../redux/slices/authSlice";
import { toast } from "sonner";

export type AuthResponse = 
  | { success: true; message: string; data: unknown }
  | { status: "error"; message: string; code: string };


export const useRegister = () => {
    const dispatch: AppDispatch = useDispatch();
    
    return useMutation({
        
        mutationFn: async (data: RegisterUserSchemaType) => {
            const response = await axios.post("/auth/register", data);
            return response.data;
        },
          onSuccess: (data) => {
           
            dispatch(setToken(data?.data))
            
            if(data?.success){
                toast.success(data.message)

            }else{
                toast.error(data.message)
              
            }
        },
        onError: (error) => {
            toast.error(error.message)
          
        }
    })
}


export const useLogin = () => {
    const dispatch: AppDispatch = useDispatch();
    
    return useMutation<AuthResponse, Error, AuthUserSchemaType>({
        mutationFn: async (data: AuthUserSchemaType) => {
            const response = await axios.post("/auth/login", data);
             if (!response.data.success) {
                    return { status: "error", message: response.data.message, code: "banku" };
                }
        return response.data; 
        },
        onSuccess: (data) => {
           
            if('success' in data && data.success){
                 dispatch(setToken(data.data))
                toast.success(data.message)

            }else if('status' in data && data.status === 'error'){
                toast.error(data.message)
                
            }
        },
       onError: (error) => {
            toast.error(error.message)
          
        }
    })
}