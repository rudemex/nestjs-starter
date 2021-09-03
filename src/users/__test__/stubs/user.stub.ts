import { User } from '../../entities/user.entity';

export const userStub = (): User => {
  return {
    id: 1,
    firstName: 'Juan',
    lastName: 'Perez',
    email: 'jperez@email.com',
  };
};
