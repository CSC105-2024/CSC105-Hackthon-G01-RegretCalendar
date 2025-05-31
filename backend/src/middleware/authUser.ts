import { jwtVerify } from "jose";
import { setCookie, getCookie } from "hono/cookie";
import type { MiddlewareHandler, Context } from "hono";
import type { DailyLog, Idea } from "../generated/prisma/index.js";
import { db } from "../index.ts";
type MyPayload = {
  id:string
  username: string;
  email: string;
  ideas: Idea[];
  dailyLogs: DailyLog[  ];
};

export const authUser: MiddlewareHandler = async (c: Context, next) => {
  const token = getCookie(c, "token");

  const secret = new TextEncoder().encode(process.env.TOKEN_KEY);

  if (typeof token == "string") {
    setCookie(c, "token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 3600,
    });
  } else return c.json({ Error: "Unauthorized." }, 401);

  try {
    const { payload } = (await jwtVerify(token, secret)) as {
      payload: MyPayload;
    };

    c.set("user", payload);
    await next();
  } catch (err) {
    return c.json({ error: "Invalid Token" }, 403);
  }
};
