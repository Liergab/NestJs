import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.employeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const emp = this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!emp) {
      throw new NotFoundException('Employee does not exist!');
    }
    return emp;
  }

  async update(id: number, updateEmployeeDto: Prisma.employeeUpdateInput) {
    this.findOne(id);
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    this.findOne(id);
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
