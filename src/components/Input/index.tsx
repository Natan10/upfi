import React from "react";
import { UseFormRegister } from "react-hook-form";

export type Props = {
  name: string;
  register: UseFormRegister<any>;
  errorForm?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export const Input = ({ errorForm, name, register, ...rest }: Props) => {
  return (
    <div className="mb-4 w-full">
      <input
        className="px-7 py-3 w-full outline-none text-white bg-secondary/80 rounded-[6px]"
        {...register(name)}
        {...rest}
      />
      {errorForm && (
        <div className="mt-[1px]">
          <p className="text-red-500 font-light text-xs" key={errorForm}>
            {errorForm}
          </p>
        </div>
      )}
    </div>
  );
};
