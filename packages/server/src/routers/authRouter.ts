import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import {
    loginHandler,
    logoutHandler,
    refreshAccessTokenHandler,
    registerHandler,
} from "../controllers/auth.controller";

import { t } from "../app"

export const authRouter = t.router({
    registerUser: t.procedure
        .input(createUserSchema)
        .mutation(({ input }) => registerHandler({ input })),
    loginUser: t.procedure
        .input(loginUserSchema)
        .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
    logoutUser: t.procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
    refreshToken: t.procedure.query(({ ctx }) =>
        refreshAccessTokenHandler({ ctx })
    ),
});