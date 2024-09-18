/* eslint-disable */

import HttpStatus from "http-status";
import axios, { ResponseType } from "axios";

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function handleLogin({ accessToken, refreshToken }: any) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function handleLogout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

const API_URL = process.env.REACT_APP_API_URL;

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function unauthorizedResponseHandlerInterceptor(err: any) {
  const originalRequest = err.config;

  if (!originalRequest) {
    return Promise.reject(err);
  }

  const errorCode = err.response && err.response.status;

  if (errorCode !== HttpStatus.UNAUTHORIZED) {
    return Promise.reject(err);
  }

  handleLogout();
  return;
}

http.interceptors.request.use(function (config) {
  if (config.headers) {
    const token = getAccessToken();

    if (!!token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return unauthorizedResponseHandlerInterceptor(err);
  }
);

export default http;
