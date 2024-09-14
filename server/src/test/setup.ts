import request from 'supertest';

import route from '@/route';

import App from '../app';

export const app = new App(route).app;

beforeAll(async () => {});

beforeEach(async () => {});

export const signin = async () => {
  const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

  const authResponse = await request(app).post('/api/auth/users/signup').send(data).expect(201);
  const cookie = authResponse.get('Set-Cookie');

  return cookie;
};
