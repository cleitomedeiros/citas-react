import { useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    const obtenerLs = () => {
      const pacientesLs = JSON.parse(localStorage.getItem('pacientes' )) || [];
      setPacientes(pacientesLs)
    }
    obtenerLs();
  }, []);

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify( pacientes ));
  }, [pacientes])

  const eliminarPaciente = id => {
    const pacientesEditar = pacientes.filter(paciente => paciente.id !== id );
    setPacientes(pacientesEditar);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 flex">
        <Formulario 
        pacientes={ pacientes } 
        setPacientes={ setPacientes }
        //Ok+++
        paciente={ paciente } 
        />

        <ListadoPacientes 
        pacientes={ pacientes }
        setPaciente={ setPaciente }
        eliminarPaciente={ eliminarPaciente }
        />
      </div>
    </div>
  );
}

export default App;
