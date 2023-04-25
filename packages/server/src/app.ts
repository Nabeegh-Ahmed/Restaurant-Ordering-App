import path from "path";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

import { deserializeUser } from "./middleware/deserializeUser";
import connectDB from "./utils/connectDB";
import customConfig from "./config/default";

dotenv.config({ path: path.join(__dirname, "./.env") });

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => deserializeUser({ req, res });
export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

import { authRouter } from "./routers/authRouter";
import { userRouter } from "./routers/userRouter";
import { restaurantRouter } from "./routers/restaurantRouter";
import { blogRouter } from "./routers/blog.router";

const appRouter = t.mergeRouters(authRouter, userRouter, restaurantRouter, blogRouter);
export type AppRouter = typeof appRouter;

const app = express();
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  cors({
    origin: [customConfig.origin],
    credentials: true,
  })
);
app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = customConfig.port;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
  connectDB();
});
