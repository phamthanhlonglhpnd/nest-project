import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MeetingService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';

@Controller('Meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('/create')
  create(@Body() createMeetingDto: CreateMeetingDto) {
    return this.meetingService.create(createMeetingDto);
  }

  @Post('/create-many')
  createMany(@Body() meetings: Partial<CreateMeetingDto>[]) {
    return this.meetingService.createManyMeeting(meetings);
  }

  @Get('/get-all')
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingService.findOne(+id);
  }
}
