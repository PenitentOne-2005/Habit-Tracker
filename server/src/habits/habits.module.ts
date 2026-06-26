import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './habit.entity';
import { HabitCompletion } from './habit-completion.entity';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitCompletion])],
  controllers: [HabitsController],
  providers: [HabitsService],
})
export class HabitsModule {}
