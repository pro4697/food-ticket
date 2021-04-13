import * as types from '@redux/actions/types';

type TTypes = keyof typeof types;
export const Types: TTypes[] = Object.keys(types) as any[];

type TAction = {
  type: TTypes;
  payload?: any;
};

export default (state = {}, action: TAction) => {
  switch (action.type) {
    case types.REGISTER_USER:
      return { ...state, register: action.payload };
    case types.LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case types.AUTH_USER:
      return { ...state, userData: action.payload };
    case types.LOGOUT_USER:
      return { ...state };
    case types.DELETE_USER:
      return { ...state };
    default:
      return state;
  }
};
