import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

  const { dispatch } = useContext( AuthContext );

  const handleClick = () => {
    const lastPath = localStorage.getItem('lastPath') || '/';
    
    dispatch({
      type: types.login,
      payload: {
        name: 'Samuel'
      }
    });
    
    history.replace( lastPath );
    // history.push('/'); // agrega la ruta a la historia del navegador
    // history.replace('/'); // reemplaza una ruta previa por una nueva en la historia del navegador
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
