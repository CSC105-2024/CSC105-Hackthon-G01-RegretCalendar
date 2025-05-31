import { db } from "../index.ts";

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const user = await db.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  });
  return user;
};

export const getAllUsers = async () => {
  const users = await db.user.findMany({
    include: {
      ideas: true,
      dailyLogs: true,
    },
  });
  return users;
};

export const getOneUser = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      ideas: true,
    },
  });
  return user;
};

export const editUser = async (
  id: string,
  data: {
    username?: string;
    age?: number;
    img?: string;
  }
) => {

  const user = await db.user.update({
    where: {
      id: id,
    },
    data: {
      username: data.username,
    },
  });
  return user;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const user = await db.user.findUnique({
    where: {
      email: data.email,
      password: data.password,
    },
  });

  if (!user) throw new Error("Not match");
  return user;
};
