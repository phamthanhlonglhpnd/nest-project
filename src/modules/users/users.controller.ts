import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/create-many')
  createMany(@Body() users: Partial<CreateUserDto>[]) {
    return this.userService.createManyUsers(users);
  }

  @Get('/get-all')
  findAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    const limitNumber = parseInt(limit, 10) || 10; 
    const offsetNumber = parseInt(offset, 10) || 0;
    return this.userService.findAll(limitNumber, offsetNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
