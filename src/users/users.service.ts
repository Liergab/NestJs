/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  private user = [
    {
      id: 1,
      name: 'Bryan',
      gender: 'Male',
      age: 24,
    },
    {
      id: 2,
      name: 'Gabriel',
      gender: 'Male',
      age: 22,
    },
  ];
  getUser() {
    return this.user;
  }

  getUserById(id: number) {
    const existingUser = this.user.find((u) => u.id == id);
    if (!existingUser) throw new NotFoundException('User Not Found!');
    return existingUser;
  }

  createUser(createUserDto: CreateUserDto) {
    const lastId = this.user.length + 1;

    const newUser = {
      id: lastId,
      ...createUserDto,
    };
    this.user.push(newUser);
    return newUser;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    this.getUserById(id);
    const index = this.user.findIndex((u) => u.id == id);
    const updateUser = {
      ...this.user[index],
      ...updateUserDto,
    };
    this.user[index] = updateUser;

    return updateUser;
  }

  deleteUser(id: number) {
    this.getUserById(id);
    const index = this.user.findIndex((u) => u.id == id);
    this.user.splice(index, 1);

    return `User with ID ${id} has been deleted`;
  }
}
