import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
  test('debe retornar un estado por defecto', () => {
    const state = authReducer({ logged: false }, {});
    expect( state ).toStrictEqual({logged: false});
  });

  test('debe autenticar y colocar el nombre del usuario', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Samuel'
      }
    }

    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      name: 'Samuel'
    });
  });
  
  test('debe borrar el nombre del usuario y establecer logged en false', () => {
    const action = {
      type: types.logout
    }

    const state = authReducer({ logged: true, name: 'Samuel' }, action);
    expect(state).toEqual({ logged: false });
  });
});
