import { User } from '../../entiities/user.entity';

export const userStub = (): User => {
  return {
    id: 1,
    firstName: 'Juan',
    lastName: 'Perez',
    email: 'jperez@email.com',
  };
};
