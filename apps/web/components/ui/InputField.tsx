import type { UseFormRegisterReturn } from "react-hook-form";

function InputField<T extends string>({
  register,
  name,
  placeholder,
  error,
}: {
  register: UseFormRegisterReturn<T>;
  name: T;
  placeholder: string;
  error: string | undefined;
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="font-bold" htmlFor={name}>
        {name}
      </label>

      <div className="relative flex flex-col">
        <input
          className="rounded-md border border-gray-400 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          id="name"
          placeholder={placeholder}
          type="text"
          {...register}
        />
        {error ? (
          <span className="absolute -bottom-10 w-full text-xs text-red-600">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputField;
