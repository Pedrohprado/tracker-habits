import type { FastifyReply, FastifyRequest } from 'fastify';
import z from 'zod';
import { PrismaHabitWeekDaysRepository } from '../../repositories/prisma/prisma-habits-week-days-repository';
import { PrismaHabitRepository } from '../../repositories/prisma/prisma-habits-repository';
import {
  CreateHabitService,
  GetHabitsForToday,
} from '../../services/habit-service';
import { PrismaHabitCompletion } from '../../repositories/prisma/prisma-habits-completion';
import { CheckInHabitService } from '../../services/habit-completion-service';

export async function checkin(req: FastifyRequest, reply: FastifyReply) {
  const checkinParamsSchema = z.object({
    habitId: z.string(),
  });

  const { habitId } = checkinParamsSchema.parse(req.params);

  try {
    const prismaHabitsCompletionRepository = new PrismaHabitCompletion();
    const checkinHabitService = new CheckInHabitService(
      prismaHabitsCompletionRepository,
    );

    await checkinHabitService.execute({ habitId });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      message: 'Erro interno no servidor',
    });
  }
}

export async function getHabitsForToday(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  //i need change this when i get userId by JWT
  const userId = '4dccfc9a-72f4-4f48-8fab-b5fb558b19cc';

  try {
    const prismaHabitRepository = new PrismaHabitRepository();
    const findHabitsForTodayService = new GetHabitsForToday(
      prismaHabitRepository,
    );

    const habits = await findHabitsForTodayService.execute({ userId });

    reply.status(200).send({ habits });
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

    //i need change this when i get userId by JWT
    const userId = '4dccfc9a-72f4-4f48-8fab-b5fb558b19cc';

    await createHabitService.execute({ habit, habitWeekList, userId });
  } catch (error) {
    console.log(error);
    reply.status(500).send({
      message: 'Erro interno no servidor',
    });
  }
}
