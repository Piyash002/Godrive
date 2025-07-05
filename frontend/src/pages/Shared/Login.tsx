
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/user/input/Input";
import { useForm } from "react-hook-form";

export default function LoginForm() {
interface  LoginInputs {
  email:string;
  password:string;
}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit = (data: LoginInputs) => {
    console.log("Login data:", data);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-bold text-center text-black">Sign an account</h2>
        <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
          <InputField
          className="text-black"
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
           className="text-black"
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
