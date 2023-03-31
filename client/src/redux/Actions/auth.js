export const SET_USER = 'setUser';
export const LOGOUT = 'logout';

export const setUser = data => {
  return {
    type: SET_USER,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
