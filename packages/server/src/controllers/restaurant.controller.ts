import { TRPCError } from '@trpc/server';
import { Context } from '../app';
import { CreateRestaurantInput, GetRestaurantInput } from '../schemas/restaurant.schema';
import { createRestaurant, getRestaurant } from '../services/restaurant.service';

export const createRestaurantHandler = async ({ input, ctx }: { ctx: Context, input: CreateRestaurantInput }) => {
    try {
        const user = ctx.user;
        if (!user) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You are not authorized to perform this action',
            });
        }
        const res = await createRestaurant({
            name: input.name,
            username: input.username,
            description: input.description,
            owner: user._id
        })
        return {
            status: "success",
            data: {
                restaurant: res
            }
        }
    } catch (err: any) {
        console.log(err)
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message,
        });
    }
};

export const getRestaurantHandler = async ({ input, ctx }: { ctx: Context, input: GetRestaurantInput }) => {
    try {
        const restaurant = await getRestaurant(input.id);
        console.log(restaurant)
        return {
            status: "success",
            data: {
                restaurant
            }
        }
    } catch (err: any) {
        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message,
        });
    }
}
