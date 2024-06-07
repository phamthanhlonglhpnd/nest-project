import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { handleThrowError } from 'src/utils/handleError';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      handleThrowError(error);
    }
  }

  async createManyUsers(users: Partial<CreateUserDto>[]): Promise<User[]> {
    try {
      const newUsers = this.userRepository.create(users);
      return await this.userRepository.save(newUsers);
    } catch (error) {
      handleThrowError(error);
    }
  }

  async findAll(
    limit: number,
    page: number,
  ): Promise<{
    data: User[];
    hasMoreData: boolean;
  }> {
    try {
      const [users, total] = await this.userRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        relations: ['meetings'],
        relationLoadStrategy: 'query',
      });
      const hasMoreData = page * limit < total;
      return {
        data: users,
        hasMoreData,
      };
    } catch (error) {
      handleThrowError(error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        relations: ['meetings'],
      });
    } catch (error) {
      handleThrowError(error);
    }
  }
}
