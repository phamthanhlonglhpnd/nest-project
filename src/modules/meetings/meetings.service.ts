import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { Repository } from 'typeorm';
import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { handleThrowError } from 'src/utils/handleError';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createMeetingDto: CreateMeetingDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: createMeetingDto.userId },
      });
      if (!user) {
        throw new NotFoundException('User is not found');
      }
      if (
        createMeetingDto.startDay < 1 ||
        createMeetingDto.endDay < 1 ||
        createMeetingDto.startDay > createMeetingDto.endDay ||
        createMeetingDto.endDay > user.days
      ) {
        throw new BadRequestException(
          "Invalid meeting days: start_day and end_day must be within the user's available days, and start_day must be less than or equal to end_day.",
        );
      }
      const meeting = this.meetingRepository.create(createMeetingDto);
      meeting.user = user;
      meeting.userId = user.id;
      return await this.meetingRepository.save(meeting);
    } catch (error) {
      handleThrowError(error);
    }
  }

  async createManyMeeting(
    meetings: Partial<CreateMeetingDto>[],
  ): Promise<Meeting[]> {
    try {
      const newMeetings = await Promise.all(
        meetings.map(async (meetingData) => {
          const user = await this.userRepository.findOne({
            where: { id: meetingData.userId },
          });
          if (!user) {
            throw new NotFoundException('User not found');
          }
          if (
            meetingData.startDay < 1 ||
            meetingData.endDay < 1 ||
            meetingData.startDay > meetingData.endDay ||
            meetingData.endDay > user.days
          ) {
            throw new BadRequestException(
              "Invalid meeting days: start_day and end_day must be within the user's available days, and start_day must be less than or equal to end_day.",
            );
          }
          const meeting = this.meetingRepository.create(meetingData);
          meeting.user = user;
          meeting.userId = user.id;
          return meeting;
        }),
      );
      return this.meetingRepository.save(newMeetings);
    } catch (error) {
      handleThrowError(error);
    }
  }

  async findAll() {
    try {
      return await this.meetingRepository.find({ relations: ['user'] });
    } catch (error) {
      handleThrowError(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.meetingRepository.findOne({
        where: { id },
        relations: ['user'],
      });
    } catch (error) {
      handleThrowError(error);
    }
  }
}
