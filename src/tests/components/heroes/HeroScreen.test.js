import React from 'react';
import { mount } from "enzyme";
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router';

describe('Pruebas en <HeroScreen />', () => {
  
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn()
  }

  test('debe mostrar el componente <Redirect /> si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/hero' ]}>
        <HeroScreen history={ historyMock } />
      </MemoryRouter>
    )

    expect( wrapper.find('Redirect').exists() ).toBe(true);
  });

  test('debe mostrar un heroe si el parametro existe y se encuentra', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
        <Route path="/hero/:heroId" component={ HeroScreen } />
      </MemoryRouter>
    )

    expect( wrapper.find('.row').exists() ).toBe(true);
  });

  test('debe regresar a la pantalla anterior con PUSH', () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn()
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
        <Route 
          path="/hero/:heroId" 
          component={ () => <HeroScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    )

    wrapper.find('button').prop('onClick')();

    expect( historyMock.push ).toHaveBeenCalledWith('/marvel');
    expect( historyMock.goBack ).not.toHaveBeenCalled();
  });
  
  test('debe regresar a la pantalla anterior con GOBACK', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/hero/marvel-spider' ]}>
        <Route 
          path="/hero/:heroId" 
          component={ () => <HeroScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    )

    wrapper.find('button').prop('onClick')();

    expect( historyMock.push ).toHaveBeenCalledTimes(0);
    expect( historyMock.goBack ).toHaveBeenCalled();
  });

  test('debe llamar al redirect si el hero no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/hero/marvel-spider123456' ]}>
        <Route 
          path="/hero/:heroId" 
          component={ () => <HeroScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    )

    expect( wrapper.text() ).toBe('');
  });
});
