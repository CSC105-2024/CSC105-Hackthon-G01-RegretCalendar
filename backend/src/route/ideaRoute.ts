import { Hono } from "hono";
import { reframer ,getAllIdeas,getIdeaFromOneUser,updateIdea,deleteIdea,createIdea,getTodayIdea,getIdeaByDay} from "../controller/ideaController.ts";
import { authUser } from "../middleware/authUser.ts";
const router = new Hono();
router.post("/reframe",reframer)
router.get("/",getAllIdeas);
router.get("/api/today",authUser,getTodayIdea);
router.get("/:id",getIdeaFromOneUser);
router.post("/",createIdea)
router.patch("/:id",updateIdea)
router.delete("/:id",deleteIdea)
router.get("/api/ideaByDay" , authUser, getIdeaByDay)


export default router;