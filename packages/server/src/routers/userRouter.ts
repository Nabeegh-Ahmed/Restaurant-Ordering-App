import { t } from "../app"
import { isAuthorizedProcedure } from "../middleware/authorizedProcedure";
import { getMeHandler } from "../controllers/user.controller";

export const userRouter = t.router({
    sayHello: t.procedure.query(async () => {
        const message = "Welcome to tRPC with React and Node";
        return { message };
    }),
    getMe: isAuthorizedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
});