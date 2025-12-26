import { AuthUserSchemaType, RegisterUserSchemaType } from "../../../../packages/types";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance as axios } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { setToken } from "../redux/slices/authSlice";
import { toast } from "sonner";
import { SERVER_ROUTES } from "../constants";
import { useGoogleLogin } from '@react-oauth/google';


export type AuthResponse = 
  | { success: true; message: string; data: unknown }
  | { status: "error"; message: string; code: string };


export const useRegister = () => {
    const dispatch: AppDispatch = useDispatch();
    
    return useMutation({
        
        mutationFn: async (data: RegisterUserSchemaType) => {
            const response = await axios.post(SERVER_ROUTES.REGISTER, data);
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
            const response = await axios.post(SERVER_ROUTES.LOGIN, data);
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

export const useSendOtp = ()=>{

    return useMutation({
        mutationFn: async (data: {email: string}) => {
            const response = await axios.post(SERVER_ROUTES.SEND_OTP, data);
            return response.data;
        },
        onSuccess: (data) => {
           
            if('success' in data && data.success){
                
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

export const useValidateOtp = ()=>{
    return useMutation({
        mutationFn: async (data: {email: string, otp: string}) => {
            const response = await axios.post(SERVER_ROUTES.VALIDATE_OTP, data);
            return response.data;
        },
        onSuccess: (data) => {
           
            if('success' in data && data.success){
                
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


export const useUpdatePassword = ()=>{
    return useMutation({
        mutationFn: async (data: {email: string, password: string}) => {
            const response = await axios.post(SERVER_ROUTES.UPDATE_PASSWORD, data);
            return response.data;
        },
        onSuccess: (data) => {
           
            if('success' in data && data.success){
                
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

export const useSendVerificationEmail = ()=>{
    return useMutation({
        mutationFn: async (data: {email: string})=>{
            const response = await axios.post(SERVER_ROUTES.SEND_VERIFICATION_EMAIL, data)
            return response.data;
        }, 
         onSuccess: (data) => {
           
            if('success' in data && data.success){
                
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



export const useGoogleAuth = ()=>{
    return useGoogleLogin({
        flow:"auth_code",
        onSuccess: async tokenResponse =>{
            const response =await axios.post(SERVER_ROUTES.GOOGLE_LOGIN, {code: tokenResponse?.code})
    
            //don't forget to decoed the token, check the role and redirect to the role page.

            toast.success(response.data.message)
        },
        onError: () => {
            toast.error("Error connecting to  google, try again later")
          
        }
    })
}