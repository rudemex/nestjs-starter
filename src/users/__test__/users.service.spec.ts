import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaginationResponse } from '@tresdoce-nestjs-toolkit/paas';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let app: INestApplication;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    app = moduleRef.createNestApplication();
    service = moduleRef.get<UsersService>(UsersService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should be return all users', async () => {
    const response: PaginationResponse<User> = await service.findAll({ page: 1, size: 10 });
    expect(response).toBeDefined();
    expect(response).toEqual(expect.any(Object));
    expect(response).toHaveProperty('data');
    expect(response.data).toEqual(expect.any(Array));
    expect(response.data).toHaveLength(10);
    expect(response).toHaveProperty('meta');
    expect(response.meta).toHaveProperty('hasNext');
    expect(response.meta).toHaveProperty('hasPrevious');
    expect(response.meta).toHaveProperty('page');
    expect(response.meta).toHaveProperty('size');
    expect(response.meta).toHaveProperty('total');
    expect(response.meta).toHaveProperty('totalPages');
  });

  it('should be return exception in findAll when page greater than the total pages', async () => {
    const page = 1000;
    await expect(service.findAll({ page, size: 10 })).rejects.toThrowError(
      `The page #${page} is greater than the total pages.`,
    );
  });

  it('should be return user find by id', async () => {
    const userID = 1;
    const response: User = await service.findOne(userID);
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

  it('should be return error exception when find user by id and dont exist', async () => {
    const userID = 9999;
    await expect(service.findOne(userID)).rejects.toThrowError(`User #${userID} not found`);
  });

  it('should be create a new user', async () => {
    const payload: CreateUserDto = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@email.com',
      gender: 'female',
      seniority: 'jr',
      experience: '',
    };
    const user: User = await service.create(payload);
    expect(user).toEqual(expect.objectContaining(payload));
  });

  it('should be update user info if the user id exist', async () => {
    const userID = 1;
    const changes: UpdateUserDto = {
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jdoe@email.com',
      seniority: 'jr',
      gender: 'male',
      experience: 'test',
    };
    const user: User = await service.update(userID, changes);
    expect(user).toEqual({ id: userID, ...changes });
  });

  it('should be return error exception when user id dont exist for update info', async () => {
    const userID = 9999;
    const changes: UpdateUserDto = {
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jdoe@email.com',
    };
    await expect(service.update(userID, changes)).rejects.toThrowError(`User #${userID} not found`);
  });

  it('should be remove user by id', async () => {
    const userID = 1;
    const user: boolean = await service.remove(userID);
    expect(user).toBeTruthy();
  });

  it('should be return error exception when user id dont exist for remove user', async () => {
    const userID = 9999;
    await expect(service.remove(userID)).rejects.toThrowError(`User #${userID} not found`);
  });
});
