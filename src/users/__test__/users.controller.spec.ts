import { Test, TestingModule } from '@nestjs/testing';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';

describe('UsersController', () => {
  let controller: UsersController;
  //let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    //service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return find user by id', async () => {
    /*jest.spyOn(service, 'findOne').mockImplementationOnce(jest.fn().mockResolvedValue(userStub()));*/
    expect(await controller.findOne(userStub().id)).toEqual(userStub());
  });

  it('should be return users', async () => {
    /*jest.spyOn(service, 'findAll').mockImplementationOnce(jest.fn().mockResolvedValue([userStub()]));*/
    expect(await controller.findAll()).toEqual([userStub()]);
  });

  it('should be create user', async () => {
    const payload: CreateUserDto = {
      firstName: userStub().firstName,
      lastName: userStub().lastName,
      email: userStub().email,
    };

    /*jest.spyOn(service, 'create').mockImplementationOnce(jest.fn().mockResolvedValue(payload));*/
    expect(await controller.create(payload)).toEqual(expect.objectContaining(payload));
  });

  it('should be update user', async () => {
    const changes: UpdateUserDto = {
      firstName: 'Mex',
      lastName: 'Delgado',
      email: 'mdelgado@email.com',
    };

    /*jest.spyOn(service, 'update').mockImplementationOnce(jest.fn().mockResolvedValue(changes));*/
    expect(await controller.update(userStub().id, changes)).toEqual(
      expect.objectContaining(changes),
    );
  });

  it('should be delete user', async () => {
    /*jest.spyOn(service, 'remove').mockImplementationOnce(jest.fn().mockResolvedValue(true));*/
    expect(await controller.remove(userStub().id)).toBeTruthy();
  });
});
