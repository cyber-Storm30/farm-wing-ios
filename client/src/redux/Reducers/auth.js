import {SET_USER, LOGOUT} from '../Actions/auth';

const initialstate = {
  user: {},
};

export const authReducer = (state = initialstate, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        user: action.payload,
      };
    }
    case LOGOUT: {
      return {
        user: {},
      };
    }
    default:
      return state;
  }
};
