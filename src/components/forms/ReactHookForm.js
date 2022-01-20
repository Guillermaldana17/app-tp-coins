import { useForm } from "react-hook-form";

function ReactHookForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  console.log(errors);
  const desdeValue = watch("desde");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="email"
          {...register("email", {
            required: { value: true, message: "Campo obligatorio" },
            maxLength: { value: 10, message: "Muy largo" },
            minLength: { value: 3, message: "Muy corto" },
          })}
        />
        {errors?.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
        <input type="text" placeholder="nombre" {...register("nombre")} />

        <input type="number" placeholder="desde" {...register("desde" )} />
        <input type="number" placeholder="hasta" 
            {...register("hasta", { min: { value: desdeValue, message: "Es menor que el desde" }})} 
            />
        
        <button type="submit">Confirmar</button>
      </form>
    </>
  );
}

export default ReactHookForm;
