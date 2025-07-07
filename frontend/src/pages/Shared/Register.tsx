/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputField } from "@/components/user/input/Input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form"
import type { Tregister } from "@/types/types";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
interface RegisterProps {
  onSwitchToLogin?: () => void;
}
export default function Register({ onSwitchToLogin }: RegisterProps) {
const [registerUser] = useRegistrationMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tregister>()
const onSubmit: SubmitHandler<Tregister> =async (data:Tregister) => {
 try {
    const res =await registerUser(data).unwrap()
    if(res.success){
      toast.success(res.message || "Registered successfully!");
       if (onSwitchToLogin) {
          onSwitchToLogin();
        }
    } 
 } catch (error:any) {
  toast.error(error?.data?.message)
 }
}
  return (
    <div className="p-6 ">
      <h2 className="text-xl font-bold text-center text-black dark:text-white  mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          className=" dark:text-white"
          label="Name"
          name="name"
          register={register}
          placeholder="Your full name"
          rules={{ required: "Name is required" }}
           required
          error={errors.name?.message}
        />
        <InputField
          className="text-black dark:text-white"
          type="number"
          label="Number"
          name="number"
          register={register}
          placeholder="0123456789"
          error={errors.number?.message}
        />
        <InputField
          className="text-black dark:text-white"
          label="Email"
          name="email"
          type="email"
          register={register}
          placeholder="you@example.com"
          rules={{ required: "Email is required" }}
          required
          error={errors.email?.message}
        />
        <InputField
          className="text-black dark:text-white"
          label="Password"
          name="password"
          type="password"
          register={register}
          placeholder="********"
          rules={{ required: "Password is required" }}
          required
          error={errors.password?.message}
        />
        <InputField
          className="text-black dark:text-white"
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          register={register}
          placeholder="********"
          rules={{ required: "confirm password is required" }}
          required
          error={errors. confirmpassword?.message}
        />
        <Button type="submit" className="w-full ">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
