/* eslint-disable */

import HttpStatus from "http-status";
import axios, { ResponseType } from "axios";

import config from "config";

import { getAccessToken } from "./token";
import { handleLogout } from "./handleAuth";

const http = axios.create({
  baseURL: config.apiBaseURI,
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
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
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
