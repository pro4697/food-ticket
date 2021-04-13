import { headersConfig, SERVER } from '@common/config';
import axios from 'axios';

import { AUTH_USER, DELETE_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';

export type TUserData = {
  email: string | null;
  password: string;
  name?: string;
  image?: string;
};

export function registerUser(dataToSubmit: TUserData) {
  const request = axios.post(`${SERVER}/api/users/register`, dataToSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit: TUserData) {
  const request = axios.post(`${SERVER}/api/users/login`, dataToSubmit).then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  console.log('config', headersConfig);
  const request = axios.get(`${SERVER}/api/users/auth`, headersConfig).then((response) => response.data);
  console.log('request', request);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`${SERVER}/api/users/logout`, headersConfig).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function deleteUser() {
  const userId = localStorage.getItem('userId');

  const request = axios.delete(`${SERVER}/api/users/delete`, { params: { userId } }).then((response) => response.data);

  return {
    type: DELETE_USER,
    payload: request,
  };
}
