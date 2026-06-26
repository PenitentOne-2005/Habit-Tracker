import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Habit } from './habit.entity';

@Entity({ name: 'habit_completions' })
export class HabitCompletion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Habit, { onDelete: 'CASCADE' })
  habit!: Habit;

  @Column()
  habitId!: number;

  @CreateDateColumn({ type: 'date' })
  completedAt!: Date;
}
