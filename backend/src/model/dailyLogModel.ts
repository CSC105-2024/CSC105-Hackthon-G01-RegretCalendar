import { db } from "../index.ts";

export const getTodayLog = async (today: string) => {
  try {
    let dailyLog = await db.dailyLog.findMany({
      where: {
        createdAt: {
          gte: new Date(today),
        },
      },
    });

    return dailyLog;
  } catch (err) {
    console.log(err);
  }
};

export const editTodayLog = async (
  id: string,
  data: {
    reflection: string;
  }
) => {
  try {
    let dailyLog = await db.dailyLog.update({
      where: { id },
      data: {
        reflection: data.reflection,
      },
    });

    return dailyLog;
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodayLog = async (id: string) => {
  try {
    let dailyLog = await db.dailyLog.delete({
      where: { id }
    });

    return dailyLog;
  } catch (err) {
    console.log(err);
  }
};
