import request from 'supertest';
import express from 'express';

import App from '@/app';
import route from '@/route';
import { signin } from '@/test/setup';

describe('User', () => {
  let app: express.Application;

  beforeEach(() => {
    app = new App(route).app;
  });

  describe('POST /auth/users/signup', () => {
    it('should return 400 if improper data is passed', async () => {
      const data = { password: 'password', email: 'test@gmail.com' };

      const res = await request(app).post('/api/auth/users/signup').send(data);

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is invalid', async () => {
      const data = { password: 'p', email: 'test@gmail.com', name: 'test' };

      const res = await request(app).post('/api/auth/users/signup').send(data);

      expect(res.status).toBe(400);
    });

    it('should return 200 if valid data is passed', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      const res = await request(app).post('/api/auth/users/signup').send(data);

      expect(res.status).toBe(201);
    });

    it('should return 400 if user is already signup', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      await request(app).post('/api/auth/users/signup').send(data);

      const res = await request(app).post('/api/auth/users/signup').send(data);

      expect(res.status).toBe(400);
    });

    it('should add cookie in successfull signup', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      const res = await request(app).post('/api/auth/users/signup').send(data);

      expect(res.status).toBe(201);
      expect(res.get('Set-Cookie')).toBeDefined();
    });
  });

  describe('POST /auth/users/signin', () => {
    it('should return 400 if improper data is passed', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      const res = await request(app).post('/api/auth/users/signin').send(data);

      expect(res.status).toBe(400);
    });

    it('should signin successfully with cookie for valid user.', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      await request(app).post('/api/auth/users/signup').send(data);

      const res = await request(app)
        .post('/api/auth/users/signin')
        .send({ email: data.email, password: data.password });

      expect(res.status).toBe(200);
      expect(res.get('Set-Cookie')).toBeDefined();
    });

    it('should signin throw 400 for invalid password.', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      await request(app).post('/api/auth/users/signup').send(data);

      const res = await request(app)
        .post('/api/auth/users/signin')
        .send({ email: data.email, password: 'wrongpassword' });

      expect(res.status).toBe(400);
      expect(res.get('Set-Cookie')).toBeUndefined();
    });

    it('should signin throw 400 for invalid user.', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      await request(app).post('/api/auth/users/signup').send(data);

      const res = await request(app)
        .post('/api/auth/users/signin')
        .send({ email: 'wrongmail@gmail.com', password: data.password });

      expect(res.status).toBe(400);
      expect(res.get('Set-Cookie')).toBeUndefined();
    });
  });

  describe('POST /auth/users/signout', () => {
    it('should clear after signout', async () => {
      const data = { password: 'password', email: 'test@gmail.com', name: 'test' };

      await request(app).post('/api/auth/users/signup').send(data);

      const res = await request(app).post('/api/auth/users/signout').send({});

      expect(res.status).toBe(200);
      expect(res.get('Set-Cookie')[0]).toBe(
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
      );
    });
  });

  describe('GET /auth/users/currentuser', () => {
    it('should get currentuser sucessfully', async () => {
      const cookie = await signin();

      const res = await request(app).get('/api/auth/users/currentuser').set('Cookie', cookie);

      expect(res.status).toBe(200);
      expect(res.body.currentUser.email).toBeDefined();
    });

    it('should return currentuser as null if not authenticated', async () => {
      const res = await request(app).get('/api/auth/users/currentuser');

      expect(res.status).toBe(200);
      expect(res.body.currentUser).toEqual(null);
    });
  });
});
