import { TRPCError } from '@trpc/server';
import { CookieOptions } from 'express';
import { Context } from '../app';
import customConfig from '../config/default';
import { CreateUserInput, LoginUserInput } from '../schemas/user.schema';
import {
  createUser,
  findUser,
  findUserById,
  signToken,
} from '../services/user.service';
import redisClient from '../utils/connectRedis';
import { signJwt, verifyJwt } from '../utils/jwt';
// Imports [...]

// Cookie options [...]
const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
};

const accessTokenCookieOptions = {
  ...cookieOptions,
  expires: new Date(Date.now() + customConfig.accessTokenExpiresIn * 60 * 1000),
};

const refreshTokenCookieOptions = {
  ...cookieOptions,
  expires: new Date(
    Date.now() + customConfig.refreshTokenExpiresIn * 60 * 1000
  ),
};

// Register a new user
export const registerHandler = async ({
  input,
}: {
  input: CreateUserInput;
}) => {
  try {

    const user = await createUser({
      email: input.email,
      name: input.name,
      password: input.password,
      photo: input.photo ?? "https://ionicframework.com/docs/demos/api/avatar/avatar.svg",
    });

    return {
      status: 'success',
      data: {
        user,
      },
    };
  } catch (err: any) {
    console.log(err)
    if (err.code === 11000) {
      
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Email already exists'
      });
    }
    throw err;
  }
};

// Login a user
export const loginHandler = async ({
  input,
  ctx,
}: {
  input: LoginUserInput;
  ctx: Context;
}) => {
  try {
    // Get the user from the collection
    const user = await findUser({ email: input.email });

    // Check if user exist and password is correct
    if (
      !user ||
      !(await user.comparePasswords(user.password, input.password))
    ) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Invalid email or password',
      });
    }

    // Create the Access and refresh Tokens
    const { access_token, refresh_token } = await signToken(user);
    // Send Access Token in Cookie
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send Access Token
    return {
      status: 'success',
      access_token,
    };
  } catch (err: any) {
    throw err;
  }
};

// Refresh tokens handler
export const refreshAccessTokenHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = ctx.req.cookies.refresh_token as string;

    const message = 'Could not refresh access token';
    if (!refresh_token) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Validate the Refresh token
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'refreshTokenPublicKey'
    );

    if (!decoded) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub);
    if (!session) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Check if the user exist
    const user = await findUserById(JSON.parse(session)._id);

    if (!user) {
      throw new TRPCError({ code: 'FORBIDDEN', message });
    }

    // Sign new access token
    const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
      expiresIn: `${customConfig.accessTokenExpiresIn}m`,
    });

    // Send the access token as cookie
    ctx.res.cookie('access_token', access_token, accessTokenCookieOptions);
    ctx.res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    // Send response
    return {
      status: 'success',
      access_token,
    };
  } catch (err: any) {
    throw err;
  }
};

// Logout handler
const logout = ({ ctx }: { ctx: Context }) => {
  ctx.res.cookie('access_token', '', { maxAge: -1 });
  ctx.res.cookie('refresh_token', '', { maxAge: -1 });
  ctx.res.cookie('logged_in', '', {
    maxAge: -1,
  });
};
export const logoutHandler = async ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user;
    if (!user) throw Error("No User")
    await redisClient.del(user?._id.toString());
    logout({ ctx });
    return { status: 'success' };
  } catch (err: any) {
    throw err;
  }
};
