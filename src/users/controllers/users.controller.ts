import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Find user',
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Create user',
  })
  @Post()
  create(@Body() payload: CreateUserDto): Promise<User> {
    return this.usersService.create(payload);
  }

  @ApiOperation({
    summary: 'Update user',
  })
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, payload);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.usersService.remove(+id);
  }
}
