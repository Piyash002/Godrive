import { InputField } from "@/components/user/input/Input";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form"
export default function Register() {

interface Inputs {
    name: string,
    number:string,
    email: string,
    password: string,
    rules:string,
    confirmpassword: string,
}
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data)
}

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-center text-black  mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          className="text-black"
          label="Name"
          name="name"
          register={register}
          placeholder="Your full name"
          rules={{ required: "Name is required" }}
           required
          error={errors.name?.message}
        />
        <InputField
          className="text-black"
          type="number"
          label="Number"
          name="number"
          register={register}
          placeholder="0123456789"
          error={errors.number?.message}
        />
        <InputField
          className="text-black"
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
          className="text-black"
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
          className="text-black"
          label="Confirm Password"
          name="confirmpassword"
          type="confirmpassword"
          register={register}
          placeholder="********"
          rules={{ required: "confirm password is required" }}
          required
          error={errors.confirmpassword?.message}
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
