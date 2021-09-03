import { Test, TestingModule } from '@nestjs/testing';

import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { NotFoundException } from '@nestjs/common';

//jest.mock('../services/users.service');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*it('should be return all users', async () => {
    const users: User[] = await service.findAll();
    expect(await service.findAll).toBeCalledWith();
    expect(users).toEqual([userStub()]);
  });*/

  it('should be return user find by id', async () => {
    const userID = 1;
    const user: User = await service.findOne(userID);
    //expect(await service.findOne(userID)).toHaveBeenCalled();
    expect(user).toEqual(userStub());
  });

  /*it('should be find user by id', async () => {
    const user: User = await service.findOne(userStub().id);
    //expect(await service.findOne).toBeCalledWith(userStub().id);
    expect(user).toEqual(userStub());
  });*/

  /*it('should be return error when find user by incorrect id', async () => {
    jest.spyOn(service, 'findOne').mockImplementationOnce(
      jest.fn().mockResolvedValue({
        statusCode: 404,
        message: 'User #4 not found',
        error: 'Not Found',
      }),
    );

    try {
      await service.findOne(4);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });*/

  /*it('should be create a user', async () => {
    const payload: CreateUserDto = {
      firstName: userStub().firstName,
      lastName: userStub().lastName,
      email: userStub().email,
    };

    const user: User = await service.create(payload);
    expect(await service.create).toBeCalledWith(payload);
    expect(user).toEqual(userStub());
  });

  it('should be update user by id', async () => {
    const changes: UpdateUserDto = {
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jdoe@email.com',
    };
    const user: User = await service.update(userStub().id, changes);
    expect(await service.update).toBeCalledWith(userStub().id, changes);
    expect(user).toEqual(userStub());
  });

  it('should be remove user by id', async () => {
    const user = await service.remove(userStub().id);
    expect(await service.remove).toBeCalledWith(userStub().id);
    expect(user).toBeTruthy();
  });*/
});
