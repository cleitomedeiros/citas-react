import { useState, useEffect } from "react";
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente }) => {

  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [error, setError] = useState(false);

  //efecto para cargar datos del paciente si se esta editando
  useEffect(() => {
    if( paciente && Object.keys(paciente).length > 0 ) 
    {
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fecha);
        setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  //Funcion para generar un ID unico
  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha;
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //Validacion del Formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Hay al menos un campo vacio");

      setError(true);
      return;
    }
    setError(false);

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    };

    if(paciente && paciente.id) {
      //Actualizamos los valores de la base de datos con lo que hay en nuestro state
      objetoPaciente.id = paciente.id

      const pacientesEditar = pacientes.map(pacienteState => 
      pacienteState.id === paciente.id ? objetoPaciente : pacienteState) 

      setPacientes(pacientesEditar)
    } else {
      //Agregamos a nuestra lista de usuarios
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //reiniciar formulario.
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-3/5">
      <h2 className="font-blank text-3xl text-center">Seguimiento Paciente</h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold ">Administralos</span>
      </p>
      {/* formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-5 px-5 mb-10"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Mascota
          </label>

          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="md-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre Propietario
          </label>

          <input
            id="propietario"
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="md-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="md-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>

          <input
            id="alta"
            type="date"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="md-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
          <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
            value={paciente && paciente.id ? 'Editar paciente' : 'Agregar Paciente'}
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default Formulario;
