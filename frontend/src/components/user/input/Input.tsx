// components/form/InputField.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
  error,
  rules,
  required,
  disabled,
  className = "",
}) => {
  return (
    <div className="space-y-1 text-black dark:text-white">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={name}
        type={type}
        {...register(name, rules)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(error && "border-red-500", className)}
      />
      {error && <p className="text-sm text-red-500 text-start">{error}</p>}
    </div>
  );
};
