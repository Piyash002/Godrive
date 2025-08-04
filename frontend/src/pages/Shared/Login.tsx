// components/LoginForm.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/user/input/Input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import type { TLoginInputs } from "@/types/types";
import { verifyToken } from "@/utils/verifiedToken";
import type { JwtPayload } from "jwt-decode";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLoginSuccess?: () => void;
}

interface DecodedUser extends JwtPayload {
  role?: string;
}

export default function LoginForm({ onLoginSuccess }: LoginProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginInputs>();
  
  const [loginUser] = useLoginMutation();

  const onSubmit = async (data: TLoginInputs) => {
    try {
      const res = await loginUser(data).unwrap();
      if (res.success) {
        toast.success(res.message || "Login successfully!");
        if (onLoginSuccess) onLoginSuccess();
      }
      const user = verifyToken(res.data.accessToken) as DecodedUser;
      dispatch(setUser({ user, token: res.data.accessToken }));

      if (user?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 dark:bg-black">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center text-black dark:text-white">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField
            label="Email"
            name="email"
            register={register}
            type="email"
            placeholder="you@example.com"
            required
            rules={{ required: "Email is required" }}
            error={errors.email?.message}
            className="text-black dark:text-white"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            register={register}
            placeholder="********"
            required
            rules={{ required: "Password is required" }}
            error={errors.password?.message}
            className="text-black dark:text-white"
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
