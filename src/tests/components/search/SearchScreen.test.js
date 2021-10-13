import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en <SearchScreen />', () => {
  
  test('debe mostrarse correctamente con valores por defecto', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={ SearchScreen } />
      </MemoryRouter>
    );

    expect( wrapper ).toMatchSnapshot();
    expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a hero');
  });
  
  test('debe mostrar a batman y el input con el valor del query', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={ SearchScreen } />
      </MemoryRouter>
    );

    expect( wrapper.find('input').prop('value') ).toBe('batman');
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('debe mostrar un mensaje de error si no se encuentra el hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman123456']}>
        <Route path="/search" component={ SearchScreen } />
      </MemoryRouter>
    );

    expect( wrapper.find('input').prop('value') ).toBe('batman123456');
    expect( wrapper.find('.alert-danger').text().trim() ).toBe('There is not a hero with batman123456');
    expect( wrapper ).toMatchSnapshot();
  });
  
  test('debe llamar el push del history', () => {
    const historyMock = {
      push: jest.fn()
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route 
          path="/search"
          component={ () => <SearchScreen history={ historyMock } /> }
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'batman'
      }
    });

    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });

    expect( historyMock.push ).toHaveBeenCalledWith('?q=batman');
  })
  

});
