import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { HabitCompletion } from './habit-completion.entity';
import { CreateHabitDto, UpdateHabitDto } from './dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepo: Repository<Habit>,
    @InjectRepository(HabitCompletion)
    private readonly completionRepo: Repository<HabitCompletion>,
  ) {}

  async create(userId: number, dto: CreateHabitDto): Promise<Habit> {
    const habit = this.habitRepo.create({ ...dto, userId });
    return this.habitRepo.save(habit);
  }

  async findAll(userId: number): Promise<Habit[]> {
    return this.habitRepo.find({
      where: { userId, isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    userId: number,
    id: number,
    dto: UpdateHabitDto,
  ): Promise<Habit> {
    const habit = await this.findOneOrFail(id, userId);
    Object.assign(habit, dto);
    return this.habitRepo.save(habit);
  }

  async remove(userId: number, id: number): Promise<void> {
    const habit = await this.findOneOrFail(id, userId);
    habit.isActive = false;
    await this.habitRepo.save(habit);
  }

  async complete(userId: number, id: number): Promise<Habit> {
    const habit = await this.findOneOrFail(id, userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (habit.lastCompletedAt) {
      const last = new Date(habit.lastCompletedAt);
      last.setHours(0, 0, 0, 0);

      const diffDays = Math.round(
        (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (diffDays === 0) {
        throw new BadRequestException('Habit already completed today');
      }

      habit.streak = diffDays === 1 ? habit.streak + 1 : 1;
    } else {
      habit.streak = 1;
    }

    habit.lastCompletedAt = today;
    await this.habitRepo.save(habit);

    const completion = this.completionRepo.create({ habitId: id });
    await this.completionRepo.save(completion);

    return habit;
  }

  async getCompletions(
    userId: number,
  ): Promise<{ date: string; count: number }[]> {
    const completions = await this.completionRepo
      .createQueryBuilder('c')
      .innerJoin('c.habit', 'h')
      .where('h.userId = :userId', { userId })
      .select('CAST(c.completedAt AS DATE)', 'date')
      .addSelect('COUNT(*)', 'count')
      .groupBy('CAST(c.completedAt AS DATE)')
      .orderBy('date', 'ASC')
      .getRawMany();

    return completions.map((c) => ({
      date: c.date,
      count: Number(c.count),
    }));
  }

  private async findOneOrFail(id: number, userId: number): Promise<Habit> {
    const habit = await this.habitRepo.findOne({ where: { id } });
    if (!habit) throw new NotFoundException('Habit not found');
    if (habit.userId !== userId) throw new ForbiddenException();
    return habit;
  }
}
