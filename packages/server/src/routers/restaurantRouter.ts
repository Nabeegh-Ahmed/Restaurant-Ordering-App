

import { t } from "../app"
import { createRestaurantHandler, getRestaurantHandler } from "../controllers/restaurant.controller";
import { isAuthorizedProcedure } from "../middleware/authorizedProcedure";
import { createRestaurantSchema, getRestaurantSchema } from "../schemas/restaurant.schema";

export const restaurantRouter = t.router({
    createRestaurant: isAuthorizedProcedure
        .input(createRestaurantSchema)
        .mutation(({ input, ctx }) => createRestaurantHandler({ input, ctx })),
    getRestaurant: t.procedure
        .input(getRestaurantSchema)
        .query(({ input, ctx }) => getRestaurantHandler({ input, ctx }))
});