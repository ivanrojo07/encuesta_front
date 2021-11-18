import React, { useContext } from 'react'
import { Context } from '../Context';
import useInputValue from '../hooks/useInputValue'

const Register = () => {
    const { activateAuth } = useContext(Context);
    const nombre = useInputValue("");
    const apellido = useInputValue(""); 
    const email = useInputValue("");
    const sexo = useInputValue("");
    const edad = useInputValue("");
    const aviso = useInputValue(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            "nombre":nombre.value,
            "apellido": apellido.value,
            "email": email.value,
            "sexo": sexo.value,
            "edad": edad.value
        };
        fetch("http://127.0.0.1:8000/api/perfil/register",{
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log('response',response);
            if(response.message === 'success' && response.token) {
                activateAuth(response.token)
            }
        })
        .catch(error => {
            console.log('error', error);
        });
    }
    return (
        <section className="text-gray-600 relative">
            <div className="container xl:mx-auto xs:w-full flex">
                <div className="xs:w-full content-center bg-gray-100 rounded-lg p-8 flex flex-col w-1/2 mx-auto shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Cuentanos sobre ti</h2>
                        <p className="leading-relaxed mb-5 text-gray-600">Para poder contestar nuestras preguntas es necesario saber más de ti</p>
                        <div className="relative mb-4">
                            <label for="nombre" className="leading-7 text-sm text-gray-600">Nombre</label>
                            <input type="text" id="nombre" {...nombre} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label for="apellido" className="leading-7 text-sm text-gray-600">Apellido</label>
                            <input type="text" id="apellido" {...apellido} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" {...email} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label for="sexo" className="leading-7 text-sm text-gray-600">Sexo</label>
                            <select id="sexo" name="sexo" required {...sexo} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                <option value="">Seleccione una opción</option>
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                            </select>
                        </div>
                        <div className="relative mb-4">
                            <label for="edad" className="leading-7 text-sm text-gray-600">Edad</label>
                            <input type="number" min="0" max="99" id="edad" {...edad} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label for="aviso" className="text-xs text-gray-500 mt-3 leading-7 text-sm text-gray-600">
                                <input type="checkbox" id="aviso" {...aviso} className="checked:bg-blue-600 checked:border-transparent" />
                                Acepta nuestro avisos de privacidad.
                            </label>
                        </div>
                        <span className="">
                            
                        </span>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Register