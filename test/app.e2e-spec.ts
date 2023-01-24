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

  it('(GET) /', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });

  it('(GET) /test-env', () => {
    return request(app.getHttpServer()).get('/test-env').expect(200).expect('testKeyEnv-test');
  });

  it('(GET) /my-util', () => {
    return request(app.getHttpServer()).get('/my-util').expect(200).expect('this is an util');
  });

  it('(GET) /health/liveness', () => {
    return request(app.getHttpServer()).get('/health/liveness').expect(200).expect({
      status: 'up',
    });
  });

  it('(GET) /health/readiness', () => {
    return request(app.getHttpServer()).get('/health/readiness').expect(200);
  });

  it('(GET) /characters', () => {
    return request(app.getHttpServer())
      .get('/characters')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('info');
        expect(res.body).toHaveProperty('results');
      });
  });
});
