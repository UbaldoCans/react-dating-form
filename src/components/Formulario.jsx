import { useState, useEffect } from "react"
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
      const [nombre, setNombre] = useState('')
      const [propietario, setPropietario] = useState('')
      const [email, setEmail] = useState('')
      const [fecha, setFecha] = useState('')
      const [sintomas, setSintomas] = useState('')

      const [error, setError] = useState(false)
      
      useEffect(() =>{
        if(Object.keys(paciente).length > 0){
          setNombre(paciente.nombre)
          setPropietario(paciente.propietario)
          setEmail(paciente.email)
          setFecha(paciente.fecha)
          setSintomas(paciente.sintomas)
        }
      },[paciente])

  
      const generarId = () =>{
         const random = Math.random().toString(36).substring(2);
         const fecha = Date.now().toString(36);
         
         return random + fecha
      }
      
      const handleSubmit =(e) =>{
          e.preventDefault();
          //validacion del formulario

          if([nombre, propietario, email, fecha, sintomas].includes('')){
            console.log('hay un campo vacio')

            setError(true)
            return;
          }
          setError(false)
          //objeto de paciente
          const objetoPaciente ={
              nombre,
              propietario,
              email,
              fecha,
              sintomas,
              id: generarId()
          }

              if(paciente.id) {
                // editando el registro
                objetoPaciente.id = paciente.id
                const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id ===
                  paciente.id ? objetoPaciente : pacienteState);

                  setPacientes(pacientesActualizados);
                  setPaciente({})

              }else{
                // nuevo registro
                objetoPaciente.id = generarId();
                setPacientes([...pacientes, objetoPaciente]);

              }
                   
         //reiniciar el form
         setNombre('')
         setPropietario('')
         setEmail('')
         setFecha('')
         setSintomas('')
      }
    

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5 ">
        <h2 className="font-black text-3xl text-center uppercase">seguimiento pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10 uppercase">
            Añade pacientes y {''}
            <span className="text-indigo-600 font-bold uppercase">Administralos</span>
        </p>

        <form onSubmit={handleSubmit}
          className="bg-green-100 shadow-md rounded-lg py-10 px-5 mb-10"

        >
            {error && <Error>Todos los elementos son necesarios</Error>}

            <div className="mb-5">
               <label htmlFor="mascota" className="bock text-gray-700 uppercase font-bold" >
                Nombre mascota
                </label>

               <input
                   id="mascota"
                   type="text"
                   placeholder="Nombre de la mascota"
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                   value={nombre}
                   onChange={(e) => setNombre(e.target.value)}
               />
            </div>
            <div className="mb-5">
               <label htmlFor="propietario" className="bock text-gray-700 uppercase font-bold" >
                Nombre propietario
                </label>

               <input
                   id="propietario"
                   type="text"
                   placeholder="Nombre del propietario"
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                   value={propietario}
                   onChange={(e) => setPropietario(e.target.value)}
               />
            </div>
            <div className="mb-5">
               <label htmlFor="email" className="bock text-gray-700 uppercase font-bold" >
                email
                </label>

               <input
                   id="email"
                   type="email"
                   placeholder="Email contacto propietario"
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="mb-5">
               <label htmlFor="alta" className="bock text-gray-700 uppercase font-bold" >
                 alta
                </label>

               <input
                   id="alta"
                   type="date"
                   placeholder="alta"
                   className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                   value={fecha}
                   onChange={(e) => setFecha(e.target.value)}
               />
            </div>
            <div className="mb-5">
               <label htmlFor="sintomas" className="bock text-gray-700 uppercase font-bold" >
                sintomas
                </label>
                <textarea
                  id="sintomas"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
                  placeholder="Sintomas de la mascota"
                  value={sintomas}
                   onChange={(e) => setSintomas(e.target.value)}
                />
      
            </div>
            <input
              type="submit"
              className="bg-indigo-300 w-full p-3 rounded-md text-white uppercase font-bold
              hover:bg-indigo-400 cursor-pointer transition-all"
              value={paciente.id ? 'guardar' : 'agregar paciente'}
            />
        </form>
    </div>
  )
}

export default Formulario