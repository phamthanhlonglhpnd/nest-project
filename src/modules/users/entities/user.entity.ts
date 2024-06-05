import { IsInt, Max, Min } from 'class-validator';
import { Meeting } from 'src/modules/meetings/entities/meeting.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  gender: string;

  @Column({ name: 'ip_address' })
  ipAddress: string;

  @Column()
  @IsInt()
  @Min(1)
  @Max(50)
  days: number;

  @OneToMany(() => Meeting, (meeting) => meeting.user)
  meetings: Meeting[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
