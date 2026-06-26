import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { type AuthRequest, JwtAuthGuard } from '../auth/jwt';
import { HabitsService } from './habits.service';
import { CreateHabitDto, UpdateHabitDto } from './dto/habit.dto';

@UseGuards(JwtAuthGuard)
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @Post()
  create(@Req() req: AuthRequest, @Body() dto: CreateHabitDto) {
    return this.habitsService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.habitsService.findAll(req.user.id);
  }

  @Get('completions')
  getCompletions(@Req() req: AuthRequest) {
    return this.habitsService.getCompletions(req.user.id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHabitDto,
  ) {
    return this.habitsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.habitsService.remove(req.user.id, id);
  }

  @Post(':id/complete')
  complete(@Req() req: AuthRequest, @Param('id', ParseIntPipe) id: number) {
    return this.habitsService.complete(req.user.id, id);
  }
}
