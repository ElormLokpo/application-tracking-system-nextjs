import { AuthUserSchemaType } from "../../../../packages/types";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance as axios } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux";
import { setToken } from "../redux/slices/authSlice";
import { toast } from "sonner";

export const useRegister = () => {
    
    return useMutation({
        mutationFn: async (data: AuthUserSchemaType) => {
            const response = await axios.post("/auth/register", data);
            return response.data;
        }
    })
}

export const useLogin = () => {
    const dispatch: AppDispatch = useDispatch();
    
    return useMutation({
        mutationFn: async (data: AuthUserSchemaType) => {
            const response = await axios.post("/auth/login", data);
            return response.data;
        },
        onSuccess: (data) => {
           
            dispatch(setToken(data.data))
            toast.success(data.message)
        },
        onError: (error) => {
          
        }
    })
}