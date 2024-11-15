import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
  AUTH_GOOGLE_SUCCESS,
} from './auth.types';

export const authInitalState = {
  loading: false,
  token: JSON.parse(localStorage.getItem('token')) || '',
  name1: JSON.parse(localStorage.getItem('name')) || '',

  gtoken: JSON.parse(localStorage.getItem('gtoken')) || '',
  name: JSON.parse(localStorage.getItem('name')) || '',
  pic: JSON.parse(localStorage.getItem('pic')) || '',
  error: false,
};

export const authReducer = (state = authInitalState, { type, payload }) => {

  switch (type) {
    case AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('token', JSON.stringify(payload.token));
      localStorage.setItem('name', JSON.stringify(payload.name));

      return {
        ...state,
        loading: false,
        error: false,
        token: payload.token,
      };
    }

    case AUTH_GOOGLE_SUCCESS: {
      localStorage.setItem('gtoken', JSON.stringify(payload.token));
      localStorage.setItem('name', JSON.stringify(payload.name));
      localStorage.setItem('pic', JSON.stringify(payload.pic));

      return {
        ...state,
        loading: false,
        error: false,
        gtoken: payload.token,
        name: payload.name,
        pic: payload.pic,
      };
    }

    case AUTH_LOGOUT: {
      localStorage.removeItem('token');
      localStorage.removeItem('gtoken');
      localStorage.removeItem('name');
      localStorage.removeItem('pic');

      return {
        ...state,
        loading: false,
        error: false,
        token: '',
        name: '',
      };
    }
    default: {
      return state;
    }
  }
};
