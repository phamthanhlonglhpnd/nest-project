import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.meetings)
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ name: 'start_day' })
  startDay: number;

  @Column({ name: 'end_day' })
  endDay: number;

  @CreateDateColumn()
  createdAt: Date;
}
