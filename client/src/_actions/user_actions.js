import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  DELETE_USER,
} from './types';
import { headersConfig, SERVER } from '../components/Config';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER}/api/users/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`${SERVER}/api/users/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(`${SERVER}/api/users/auth`, headersConfig)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(`${SERVER}/api/users/logout`, headersConfig)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function deleteUser() {
  let dataToSubmit = {
    userId: localStorage.getItem('userId'),
  };
  const request = axios
    .post(`${SERVER}/api/users/delete`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_USER,
    payload: request,
  };
}
