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
  findAll(@Query('limit') limit: string, @Query('page') page: string) {
    const limitNumber = parseInt(limit, 10) || 10; 
    const pageNumber = parseInt(page, 10) || 0;
    return this.userService.findAll(limitNumber, pageNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
