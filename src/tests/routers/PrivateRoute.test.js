import React from 'react';
import { mount } from "enzyme";
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router';

describe('Pruebas en <PrivateRoute />', () => {

  const props = {
    location: {
      pathname: '/marvel'
    }
  }

  Storage.prototype.setItem = jest.fn();

  test('Debe mostrar el componente si está autenticado y guardar localstorage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={ true }
          component={ () => <span> listo </span> }
          { ...props }
        />
      </MemoryRouter>
    )

    expect( wrapper.find('span').exists() ).toBe(true);
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
  });

  test('debe bloquear el componente si no está autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={ false }
          component={ () => <span> listo </span> }
          { ...props }
        />
      </MemoryRouter>
    );

    expect( wrapper.find('span').exists() ).toBe(false);
    expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
  })
  
});
