import React, { useState } from "react";
import { FaUserMinus, FaUserEdit } from "react-icons/fa";
import uniqid from 'uniqid';

const Formulario = () => {
    const [nombre, setNombre] = useState(' ')
    const [listaMiembro, setListaMiembro] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)
    const [exito, setExito] = useState(null)

    const añadirNombre = (e) => {

        e.preventDefault()
        setExito(null)
        if (!nombre.trim()) {
            setError('El campo está vacio ')
            return

        }
        const nuevoMiembro = {
            id: uniqid(),
            nombre: nombre,
        }
        setListaMiembro([...listaMiembro, nuevoMiembro])
        setNombre('')
        setError(null)

    }
    const borrarNombre = (id) => {
        const nuevaLista = listaMiembro.filter(item => item.id !== id)
        setListaMiembro(nuevaLista)
        setModoEdicion(false)
    }
    const editar = (item) => {
        setModoEdicion(true)
        setNombre(item.nombre)
        setId(item.id)
        borrarNombre(null)
    }
    const editarNombre = (e) => {
        e.preventDefault()
        const nuevoArray = listaMiembro.map(item => item.id === id ? { id: item.id, nombre } : item)
        setListaMiembro(nuevoArray)
        setModoEdicion(false)
        setNombre('')
    }


    return (

        <div className="container">
            <div className="row">
                <div className="col-6 form-floating" >
                    <h3 className='mt-3 navbar navbar-light bg-light'>Listado de miembros</h3>
                    <ul key="{item.id}" className="list-group ">
                        {
                            listaMiembro.map(item =>
                                <li className="list-group-item d-flex justify-content-between">
                                    {item.nombre}
                                    <div>
                                        <button
                                            className="btn btn-danger mr-2 "
                                            onClick={() => { borrarNombre(item.id) }}
                                        >
                                            <FaUserMinus />
                                        </button>

                                        <button className="btn btn-success"
                                            onClick={() => { editar(item) }}>
                                            <FaUserEdit />
                                        </button>
                                    </div>

                                </li>)
                        }

                    </ul>
                </div>
                <div className="col-6 m3 form-group" >
                    <h3 className='mt-3 navbar navbar-light bg-light'>Añadir nuevo miembro</h3>
                    <form onSubmit={modoEdicion ? editarNombre : añadirNombre}>
                        <input
                            onChange={(e) => { setNombre(e.target.value) }}
                            placeholder="Ingresar nombre"
                            value={nombre}
                            type="text"
                            className="form-control floatingInput"
                             />
                        <input type="button"
                            className="mt-2 btn btn-primary btn-block"
                            type="submit"
                            value={modoEdicion ? 'Modificar Nombre' : 'Registrar'} />
                    </form>
                    {
                        error != null ? (<div className="alert alert-danger mt-2" role="alert">{error}</div>) : (
                            
                        
                            <div/>
                        )
                    }
                </div>
        </div>
        </div >
    );
}

export default Formulario