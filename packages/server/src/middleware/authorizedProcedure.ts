import { t } from "../app"
import { TRPCError } from "@trpc/server";

const isAuthorized = t.middleware(({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to access this resource",
        });
    }
    return next();
});

export const isAuthorizedProcedure = t.procedure.use(isAuthorized);