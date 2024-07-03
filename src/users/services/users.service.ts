import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { PaginationParams, calculatePagination } from '@tresdoce-nestjs-toolkit/paas';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@mail.com',
      gender: 'male',
      seniority: 'semi-senior',
      experience: '3 years of experience in software development',
    },
    {
      id: 2,
      firstName: 'Carlos',
      lastName: 'Rodriguez',
      email: 'carlos.rodriguez@mail.com',
      gender: 'x',
      seniority: 'trainee',
      experience: 'Currently in software dev training.',
    },
    {
      id: 3,
      firstName: 'Elena',
      lastName: 'Torres',
      email: 'elena.torres@mail.com',
      gender: 'x',
      seniority: 'trainee',
      experience: 'Trainee developer focused on software dev.',
    },
    {
      id: 4,
      firstName: 'Lucia',
      lastName: 'Rodriguez',
      email: 'lucia.rodriguez@mail.com',
      gender: 'female',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 5,
      firstName: 'Maria',
      lastName: 'Martinez',
      email: 'maria.martinez@mail.com',
      gender: 'male',
      seniority: 'semi-senior',
      experience: '',
    },
    {
      id: 6,
      firstName: 'Elena',
      lastName: 'Martinez',
      email: 'elena.martinez@mail.com',
      gender: 'female',
      seniority: 'trainee',
      experience: '',
    },
    {
      id: 7,
      firstName: 'Sofia',
      lastName: 'Martinez',
      email: 'sofia.martinez@mail.com',
      gender: 'female',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 8,
      firstName: 'Carlos',
      lastName: 'Ramirez',
      email: 'carlos.ramirez@mail.com',
      gender: 'male',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 9,
      firstName: 'Luis',
      lastName: 'Torres',
      email: 'luis.torres@mail.com',
      gender: 'x',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 10,
      firstName: 'Jose',
      lastName: 'Fernandez',
      email: 'jose.fernandez@mail.com',
      gender: 'female',
      seniority: 'trainee',
      experience: '',
    },
    {
      id: 11,
      firstName: 'Elena',
      lastName: 'Ramirez',
      email: 'elena.ramirez@mail.com',
      gender: 'x',
      seniority: 'semi-senior',
      experience: '',
    },
    {
      id: 12,
      firstName: 'Juan',
      lastName: 'Rodriguez',
      email: 'juan.rodriguez@mail.com',
      gender: 'x',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 13,
      firstName: 'Ana',
      lastName: 'Sanchez',
      email: 'ana.sanchez@mail.com',
      gender: 'male',
      seniority: 'jr',
      experience: 'Junior developer in software projects.',
    },
    {
      id: 14,
      firstName: 'Sofia',
      lastName: 'Perez',
      email: 'sofia.perez@mail.com',
      gender: 'female',
      seniority: 'semi-senior',
      experience: '',
    },
    {
      id: 15,
      firstName: 'Luis',
      lastName: 'Perez',
      email: 'luis.perez@mail.com',
      gender: 'x',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 16,
      firstName: 'Elena',
      lastName: 'Lopez',
      email: 'elena.lopez@mail.com',
      gender: 'x',
      seniority: 'trainee',
      experience: '',
    },
    {
      id: 17,
      firstName: 'Carlos',
      lastName: 'Ramirez',
      email: 'carlos.ramirez@mail.com',
      gender: 'male',
      seniority: 'senior',
      experience: '',
    },
    {
      id: 18,
      firstName: 'Luis',
      lastName: 'Rodriguez',
      email: 'luis.rodriguez@mail.com',
      gender: 'x',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 19,
      firstName: 'Elena',
      lastName: 'Rodriguez',
      email: 'elena.rodriguez@mail.com',
      gender: 'female',
      seniority: 'senior',
      experience: '',
    },
    {
      id: 20,
      firstName: 'Elena',
      lastName: 'Lopez',
      email: 'elena.lopez@mail.com',
      gender: 'x',
      seniority: 'trainee',
      experience: '',
    },
    {
      id: 21,
      firstName: 'Luis',
      lastName: 'Torres',
      email: 'luis.torres@mail.com',
      gender: 'x',
      seniority: 'senior',
      experience: '',
    },
    {
      id: 22,
      firstName: 'Lucia',
      lastName: 'Lopez',
      email: 'lucia.lopez@mail.com',
      gender: 'female',
      seniority: 'senior',
      experience: '',
    },
    {
      id: 23,
      firstName: 'Elena',
      lastName: 'Lopez',
      email: 'elena.lopez@mail.com',
      gender: 'male',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 24,
      firstName: 'David',
      lastName: 'Gonzalez',
      email: 'david.gonzalez@mail.com',
      gender: 'male',
      seniority: 'senior',
      experience: '',
    },
    {
      id: 25,
      firstName: 'David',
      lastName: 'Gonzalez',
      email: 'david.gonzalez@mail.com',
      gender: 'x',
      seniority: 'trainee',
      experience: '',
    },
    {
      id: 26,
      firstName: 'Sofia',
      lastName: 'Garcia',
      email: 'sofia.garcia@mail.com',
      gender: 'male',
      seniority: 'trainee',
      experience: '',
    },
    {
      id: 27,
      firstName: 'Sofia',
      lastName: 'Ramirez',
      email: 'sofia.ramirez@mail.com',
      gender: 'male',
      seniority: 'senior',
      experience: '',
    },
    {
      id: 28,
      firstName: 'Ana',
      lastName: 'Fernandez',
      email: 'ana.fernandez@mail.com',
      gender: 'female',
      seniority: 'semi-senior',
      experience: '',
    },
    {
      id: 29,
      firstName: 'David',
      lastName: 'Ramirez',
      email: 'david.ramirez@mail.com',
      gender: 'x',
      seniority: 'jr',
      experience: '',
    },
    {
      id: 30,
      firstName: 'Elena',
      lastName: 'Martinez',
      email: 'elena.martinez@mail.com',
      gender: 'female',
      seniority: 'jr',
      experience: '',
    },
  ];
  private counterId: number = this.users.length; //30

  async findAll({ page, size }: PaginationParams) {
    const meta = calculatePagination({
      total: this.users.length,
      page,
      size,
    });
    const startIndex: number = (meta.page - 1) * meta.size;
    const endIndex: number = startIndex + meta.size;

    if (page > meta.totalPages) {
      throw new BadRequestException(`The page #${page} is greater than the total pages.`);
    }

    return {
      data: this.users.slice(startIndex, endIndex),
      meta,
    };
  }

  async findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }

    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }

  async remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
