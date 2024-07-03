import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@tresdoce-nestjs-toolkit/paas';

import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

describe('UsersController', () => {
  let app: INestApplication;
  let controller: UsersController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = moduleRef.createNestApplication();
    controller = moduleRef.get<UsersController>(UsersController);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should be return find user by id', async () => {
    const response: User = await controller.findOne(3);
    expect(response).toBeDefined();
    expect(response).toEqual(expect.any(Object));
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('firstName');
    expect(response).toHaveProperty('lastName');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('gender');
    expect(response).toHaveProperty('seniority');
    expect(response).toHaveProperty('experience');
  });

  it('should be return users', async () => {
    const response: PaginationResponse<User> = await controller.findAll({ page: 1, size: 10 });
    expect(response).toBeDefined();
    expect(response).toEqual(expect.any(Object));
    expect(response).toHaveProperty('data');
    expect(response.data).toEqual(expect.any(Array));
    expect(response.data).toHaveLength(10);
    expect(response).toHaveProperty('meta');
    expect(response.meta).toHaveProperty('page');
    expect(response.meta).toHaveProperty('size');
    expect(response.meta).toHaveProperty('total');
    expect(response.meta).toHaveProperty('totalPages');
    expect(response.meta).toHaveProperty('hasNext');
    expect(response.meta).toHaveProperty('hasPrevious');
  });

  it('should be create user', async () => {
    const payload: CreateUserDto = {
      firstName: 'TestName',
      lastName: 'TestLastName',
      email: 'test@mail.com',
      gender: 'x',
      seniority: 'senior',
      experience: '',
    };
    const response: User = await controller.create(payload);
    expect(response).toEqual(expect.objectContaining(payload));
  });

  it('should be update user', async () => {
    const changes: UpdateUserDto = {
      firstName: 'Mex',
      lastName: 'Delgado',
      email: 'madelgado@prismamp.com',
      seniority: 'senior',
      experience: 'master of developer',
    };
    const response: User = await controller.update(1, changes);
    expect(response).toEqual(expect.objectContaining(changes));
  });

  it('should be delete user', async () => {
    const response = await controller.remove(5);
    expect(response).toBeTruthy();
  });
});
