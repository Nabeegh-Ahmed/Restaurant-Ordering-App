import { TRPCError } from '@trpc/server';
import { Context } from '../app';

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    return {
      status: 'success',
      data: {
        user,
      },
    };
  } catch (err: any) {
    console.log(err)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    });
  }
};
