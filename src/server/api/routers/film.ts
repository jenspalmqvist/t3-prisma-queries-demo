import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const filmRouter = createTRPCRouter({
  // Get-funktioner

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.film.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findUnique({
        where: {
          film_id: input.id,
        },
      });
    }),
  getByIdOrThrow: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findUniqueOrThrow({
        where: {
          film_id: input.id,
        },
      });
    }),
  getFirst: publicProcedure
    .input(z.object({ duration: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findFirst({
        where: {
          length: input.duration,
        },
      });
    }),
  getAllWithDuration: publicProcedure
    .input(z.object({ duration: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findMany({
        where: {
          length: input.duration,
        },
      });
    }),
  getAllWithDurationOver: publicProcedure
    .input(z.object({ duration: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findMany({
        where: {
          length: {
            gt: input.duration, // length > input.duration
            // gte: input.duration // length >= input.duration
            // lt: input.duration, // length < input.duration
            // lte: input.duration // length <= input.duration
          },
        },
      });
    }),

  getAllWithMultipleWhere: publicProcedure
    .input(z.object({ duration: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findMany({
        where: {
          length: {
            gt: input.duration, // length > input.duration
            // gte: input.duration // length >= input.duration
            // lt: input.duration, // length < input.duration
            // lte: input.duration // length <= input.duration
          },

          title: {
            contains: "BA",
          },
        },
      });
    }),

  getAllWithOR: publicProcedure
    .input(z.object({ duration: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findMany({
        where: {
          OR: [
            {
              length: {
                gt: input.duration,
              },
            },
            {
              title: {
                contains: "BA",
              },
            },
          ],
        },
      });
    }),

  getAllWithNOT: publicProcedure
    .input(z.object({ duration: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.film.findMany({
        where: {
          NOT: [
            {
              length: {
                gt: input.duration,
              },
            },
            {
              title: {
                contains: "BA",
              },
            },
          ],
        },
      });
    }),

  getAllWithSome: publicProcedure
    // .input(z.object({ duration: z.number() }))
    .query(({ ctx }) => {
      return ctx.db.film.findMany({
        where: {
          film_actor: {
            some: {
              actor: {
                first_name: {
                  contains: "AL",
                },
              },
            },
          },
        },
        include: {
          film_actor: {
            include: {
              actor: true,
            },
          },
        },
      });
    }),
  // Update-funktioner

  updateById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.film.update({
        where: {
          film_id: input.id,
        },
        data: {
          film_id: 12000,
        },
      });
    }),
  updateAllWithDuration: publicProcedure
    .input(z.object({ duration: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.film.updateMany({
        where: {
          length: input.duration,
        },
        data: {
          rental_duration: 5,
        },
      });
    }),

  // Delete-funktioner

  deleteById: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.film.delete({
        where: {
          film_id: input.id,
        },
      });
    }),
  deleteAllWithDuration: publicProcedure
    .input(z.object({ duration: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.film.deleteMany({
        where: {
          length: input.duration,
        },
      });
    }),
});
