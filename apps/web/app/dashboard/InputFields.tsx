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
    <>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" {...register("name", { required: true })} />
      {errors.name ? <span>This field is required</span> : null}
    </>
  );
}

export default InputFields;
