import { Hono } from "hono";
import { getTodayLog,editTodayLog,deleteTodayLog } from "../controller/dailyLogController.ts";
import { authUser } from "../middleware/authUser.ts";
const router = new Hono();

router.get("/",authUser,getTodayLog)
router.patch("/:id",editTodayLog)
router.delete("/:id",deleteTodayLog)

export default router