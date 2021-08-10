import React from 'react'

export const LoginScreen = ({ history }) => {

  const handleClick = () => {
    // history.push('/'); // agrega la ruta a la historia del navegador
    history.replace('/'); // reemplaza una ruta previa por una nueva en la historia del navegador
  }

  return (
    <div className="container mt-5">
      <h1> Login Screen </h1>
      <hr/>

      <button className="btn btn-primary" onClick={ handleClick } >
        Login
      </button>
    </div>
  )
}
