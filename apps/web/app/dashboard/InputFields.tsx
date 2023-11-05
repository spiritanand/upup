import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TcreateRoom } from "types";

function InputFields({
  register,
  errors,
}: {
  register: UseFormRegister<TcreateRoom>;
  errors: FieldErrors<TcreateRoom>;
}) {
  return (
    <div className="flex items-center gap-4">
      <label className="font-bold" htmlFor="name">
        Name
      </label>

      <div className="relative flex flex-col">
        <input
          id="name"
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 20,
              message: "Name must be at most 20 characters",
            },
            pattern: {
              value: /^(?!\s)/,
              message: "Name cannot be empty or have leading spaces",
            },
          })}
          className="rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Room Name"
        />
        {errors.name ? (
          <span className="absolute -bottom-10 w-full text-xs text-red-600">
            {errors.name.message}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputFields;
