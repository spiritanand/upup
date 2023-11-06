import type { UseFormRegisterReturn } from "react-hook-form";

function InputField<T extends string>({
  register,
  label,
  placeholder,
  error,
}: {
  register: UseFormRegisterReturn<T>;
  label: T;
  placeholder: string;
  error: string | undefined;
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="min-w-[85px] font-bold" htmlFor={label}>
        {label}
      </label>

      <div className="relative flex flex-1 flex-col">
        <input
          className="rounded-md border border-gray-400 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          id={label}
          placeholder={placeholder}
          type="text"
          {...register}
        />
        {error ? (
          <span
            className="absolute -bottom-5 w-full text-xs text-red-600"
            role="alert"
          >
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputField;
