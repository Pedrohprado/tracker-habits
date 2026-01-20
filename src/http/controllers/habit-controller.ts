import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaHabitWeekDaysRepository } from '../../repositories/prisma/prisma-habits-week-days-repository';
import { PrismaHabitRepository } from '../../repositories/prisma/prisma-habits-repository';
import { CreateHabitService } from '../../services/habit-service';
import { PrismaHabitCompletion } from '../../repositories/prisma/prisma-habits-completion';
import { CheckInHabitService } from '../../services/habit-completion';

export async function checkin(req: FastifyRequest, reply: FastifyReply) {
  const checkinBodySchema = z.object({
    completionDate: z.string(),
  });

  const checkinParamsSchema = z.object({
    habitId: z.string(),
  });

  const { completionDate } = checkinBodySchema.parse(req.body);
  const { habitId } = checkinParamsSchema.parse(req.params);

  try {
    const prismaHabitsCompletionRepository = new PrismaHabitCompletion();
    const checkinHabitService = new CheckInHabitService(
      prismaHabitsCompletionRepository,
    );

    await checkinHabitService.execute({ completionDate, habitId });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      message: 'Erro interno no servidor',
    });
  }
}

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createHabitBodySchema = z.object({
    habit: z.object({
      name: z.string(),
      description: z.string().nullable(),
      startDate: z.string(),
      endDate: z.string().nullable(),
    }),
    habitWeekList: z.array(
      z.object({
        weekDay: z.number(),
      }),
    ),
  });

  const { habit, habitWeekList } = createHabitBodySchema.parse(req.body);
  try {
    const prismaHabitsWeekDaysRepository = new PrismaHabitWeekDaysRepository();
    const prismaHabitRepository = new PrismaHabitRepository();

    const createHabitService = new CreateHabitService(
      prismaHabitRepository,
      prismaHabitsWeekDaysRepository,
    );

    const userId = '4dccfc9a-72f4-4f48-8fab-b5fb558b19cc';

    await createHabitService.execute({ habit, habitWeekList, userId });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      message: 'Erro interno no servidor',
    });
  }
}
