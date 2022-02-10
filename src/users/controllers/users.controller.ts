import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
  })
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Return list of users',
    type: User,
    isArray: true,
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Find user',
  })
  @ApiResponse({
    status: 200,
    description: 'Return user by id',
    type: User,
    isArray: false,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: Object,
    isArray: false,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Return user created',
    type: User,
    isArray: false,
  })
  @Post()
  create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @ApiResponse({
    status: 201,
    description: 'Return user updated',
    type: User,
    isArray: false,
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, payload);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted',
    type: Boolean,
    isArray: false,
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.usersService.remove(+id);
  }
}
