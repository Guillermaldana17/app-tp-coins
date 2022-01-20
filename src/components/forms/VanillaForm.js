import { useState } from "react";

function VanillaForm() {
  const [nameError, setNameError] = useState("");
  const [edadError, setEdadError] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const edad = e.target.edad.value;

    if (name.length === "") {
      setNameError("Ingrese nombre");
      return;
    }

    if (name.length < 3) {
      setNameError("Muy Corto");
      return;
    }
    if (name.length > 10) {
      setNameError("Muy Largo");
      return;
    }

    if (edad < 18) {
      setEdadError("Menor de edad");
    }
    if (edad > 120) {
      setEdadError("Edad incorrecta");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="name" name="name" />
      {nameError !== "" && <span style={{ color: "red" }}>{nameError}</span>}

      <input type="number" placeholder="edad" name="edad" />
      {edadError !== "" && <span style={{ color: "red" }}>{edadError}</span>}

      <button type="submit">Confirmar</button>
    </form>
  );
}

export default VanillaForm;
