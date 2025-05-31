import * as dailyLogModel from "../model/dailyLogModel.ts";
import type { Context } from "hono";
export const getTodayLog = async (c: Context) => {
  try {
    const user = c.get("user");
    const today = new Date().toISOString().split("T")[0];
    const userId = user.user.id;
    const todayLog = await dailyLogModel.getTodayLog(today);

    return c.json({ todayLog: todayLog });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const editTodayLog = async (c: Context) => {
  try {
    const id  = c.req.param("id")
    const body = await c.req.json();
    const todayLog = await dailyLogModel.editTodayLog(id,body);

    return c.json({ updated: todayLog });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const deleteTodayLog = async (c: Context) => {
  try {
    const id  = c.req.param("id")
    const todayLog = await dailyLogModel.deleteTodayLog(id);

    return c.json({ deleted: todayLog });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};
