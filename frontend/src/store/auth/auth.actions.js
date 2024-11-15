import axios from 'axios';
import {
  AUTH_LOGIN_LOADING,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_LOGOUT,
  AUTH_GOOGLE_SUCCESS,
} from './auth.types';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from '../../firebase/firebase';

export const loginAPI = (creds, toast, navigate) => async (dispatch) => {
  dispatch({ type: AUTH_LOGIN_LOADING });
  try {
    let response = await axios.post('http://localhost:8080/user/login', creds);
    console.log(response.token, response.name);
    dispatch({ type: AUTH_LOGIN_SUCCESS, payload: response.data });

    toast({
      title: 'Login Successfull',
      status: 'Success',
      duration: 9000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);

    return response.data;
  } catch (e) {
    dispatch({ type: AUTH_LOGIN_ERROR });

    toast({
      title: 'Login Failed',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  }
};

// -----------firebase login-----------

export const Sigup_google = (navigate, toast) => async (dispatch) => {
  try {
    const googleauth = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, googleauth);
    console.log(res);
    dispatch({
      type: AUTH_GOOGLE_SUCCESS,
      payload: {
        email: res.user.email,
        name: res.user.displayName,
        pic: res.user.photoURL,
        token: res.user.uid,
      },
    });

    toast({
      title: 'Login Successfull',
      status: 'Success',
      duration: 9000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 100);

    return signInWithPopup(auth, googleauth);
  } catch (err) {
    dispatch({ type: AUTH_LOGIN_ERROR });
    console.log(err);
    alert(err);
  }
};

export const Signout = () => ({ type: AUTH_LOGOUT });
