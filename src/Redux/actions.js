// actions.js
export const login = (user, token) => ({
    type: 'LOGIN',
    payload: { user, token },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
  });
  