import { Hono } from "hono";
import { reframer ,getAllIdeas,getIdeaFromOneUser,updateIdea,deleteIdea,createIdea} from "../controller/ideaController.ts";
const router = new Hono();
router.post("/reframe",reframer)
router.get("/",getAllIdeas);
router.get("/:id",getIdeaFromOneUser);
router.post("/",createIdea)
router.patch("/:id",updateIdea)
router.delete("/:id",deleteIdea)



export default router;