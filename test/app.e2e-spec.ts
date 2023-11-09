import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('(GET) /', async () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('(GET) /test-env', async () => {
    return request(app.getHttpServer()).get('/test-env').expect(200).expect('testKeyEnv-test');
  });

  it('(GET) /my-util', async () => {
    return request(app.getHttpServer()).get('/my-util').expect(200).expect('this is an util');
  });

  it('(GET) /health/liveness', async () => {
    return request(app.getHttpServer()).get('/health/liveness').expect(200).expect({
      status: 'up',
    });
  });

  it('(GET) /health/readiness', async () => {
    return request(app.getHttpServer()).get('/health/readiness').expect(200);
  });

  it('(GET) /characters', async () => {
    return request(app.getHttpServer())
      .get('/characters')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('info');
        expect(res.body).toHaveProperty('results');
      });
  });

  it('(GET) /characters with query params', async () => {
    return request(app.getHttpServer())
      .get('/characters')
      .query({ name: 'morty' })
      .query({ status: 'alive' })
      .query({ gender: 'female' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('info');
        expect(res.body).toHaveProperty('results');
      });
  });

  it('(GET) /users', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveLength(1);
      });
  });

  it('(GET) /users/{id}', async () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');
      });
  });

  it('(POST) /users', async () => {
    const payload = {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'jperez@email.com',
    };
    return request(app.getHttpServer())
      .post('/users')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');
        expect(res.body.email).toEqual(payload.email);
        expect(res.body.firstName).toEqual(payload.firstName);
        expect(res.body.lastName).toEqual(payload.lastName);
      });
  });

  it('(PUT) /users/{id}', async () => {
    const payload = {
      firstName: 'TestName',
      lastName: 'TestLastname',
      email: 'testmail@email.com',
    };
    return request(app.getHttpServer())
      .put('/users/1')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');
        expect(res.body.email).toEqual(payload.email);
        expect(res.body.firstName).toEqual(payload.firstName);
        expect(res.body.lastName).toEqual(payload.lastName);
      });
  });

  it('(DELETE) /users/{id}', async () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeTruthy();
      });
  });
});
