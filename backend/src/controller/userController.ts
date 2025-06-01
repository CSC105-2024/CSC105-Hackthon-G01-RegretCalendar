import { type Context } from "hono";
import * as userModel from "../model/userModel.ts";
import { SignJWT, type JWTPayload } from "jose";
import { setCookie, deleteCookie } from "hono/cookie";
import { db } from "../index.ts";
export const createUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const user = await userModel.createUser(body);
    return c.json({ user: user });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const id = c.req.param("id");
    const user = await userModel.editUser(id, body);
    if (!user) return c.json({ err: "User not found" }, 404);
    return c.json({ user: user });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const getOneUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const user = await userModel.getOneUser(id);

    return c.json({ user: user });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const getAllUsers = async (c: Context) => {
  try {
    const users = await userModel.getAllUsers();
    return c.json({ user: users });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const body = await c.req.json();
    const user = await userModel.loginUser(body);

    if (!user || Object.keys(user).length === 0) {
      return c.json({ error: "User not foundasdasd" }, 404);
    }

    const secret = new TextEncoder().encode(process.env.TOKEN_KEY);
    const token = await new SignJWT({ user: user })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    setCookie(c, "token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
      maxAge: 3600, // 1 hour
      sameSite: "Lax",
    });
    return c.json({ user: user, token: token });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const logoutUser = async (c: Context) => {
  try {
    deleteCookie(c, "token");
    return c.json({ message: "Logged Out and Cookie Deleted" });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const getProfile = async (c: Context) => {
  try {
    const userSession = c.get("user"); // still get the logged-in user's ID
    if (!userSession) return c.json({ error: "No user found" }, 404);
    
    const user = await db.user.findUnique({
      where: { id: userSession.user.id },
      include: { ideas: true    }, // or whatever relation you need
    });

    return c.json({ user: user });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};
