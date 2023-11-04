import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { TcreateRoom } from "types";

function InputFields({
  register,
  errors,
}: {
  register: UseFormRegister<TcreateRoom>;
  errors: FieldErrors;
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
          {...register("name", { required: true, minLength: 3, maxLength: 20 })}
          className="rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Room Name"
        />
        {errors.name ? (
          <span className="absolute -bottom-6 w-full text-xs text-red-600">
            Name is required*
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default InputFields;
