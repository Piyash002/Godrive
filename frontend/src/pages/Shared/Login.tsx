/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { InputField } from "@/components/user/input/Input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import type { TLoginInputs } from "@/types/types";
import { verifyToken } from "@/utils/verifiedToken";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
interface LoginProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({  onLoginSuccess }: LoginProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInputs>();
 const [loginUser] = useLoginMutation()
  const onSubmit =async (data: TLoginInputs) => {
    try {
    const res = await loginUser(data).unwrap()
    console.log(res)
    if(res.success){
      toast.success(res.message || "Login successfully!");
        if (onLoginSuccess) onLoginSuccess(); 
          navigate('/')
          }
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({user:user , token:res.data.accessToken}))
 } catch (error:any) {
  toast.error(error?.data?.message)
 }
   console.log(data)
  };

  return (
    <div className="max-w-md mx-auto mt-10  dark:bg-black">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center text-black dark:text-white">Sign an account</h2>
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
          <InputField
          className="text-black dark:text-white"
            label="Email"
            name="email"
            register={register}
            type="email"
            placeholder="you@example.com"
            required
             rules={{ required: "Email is required" }}
            error={errors.email?.message}
          />
          <InputField
           className="text-black dark:text-white"
            label="Password"
            name="password"
            type="password"
            register={register}
            placeholder="********"
            required
             rules={{ required: "Password is required" }}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
