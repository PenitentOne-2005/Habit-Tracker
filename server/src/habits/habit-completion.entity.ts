import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Habit } from './habit.entity';

@Entity({ name: 'habit_completions' })
export class HabitCompletion {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Habit, { onDelete: 'CASCADE' })
  habit!: Habit;

  @Column()
  habitId!: number;

  @Column({ type: 'date' })
  completedAt!: Date;
}
