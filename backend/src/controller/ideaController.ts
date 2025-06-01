import { type Context } from "hono";
import axios from "axios";
import * as ideaModel from "../model/ideaModel.ts";

export const createIdea = async (c: Context) => {
  try {
    const body = await c.req.json();
    const idea = await ideaModel.createIdea(body);
    return c.json({ idea: idea });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const updateIdea = async (c: Context) => {
  try {
    const body = await c.req.json();
    const id = c.req.param("id");

    
    const idea = await ideaModel.editIdea(id, body);
    if (!idea) return c.json({ err: "idea not found" }, 404);
    return c.json({ idea: idea });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const getIdeaFromOneUser = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const idea = await ideaModel.getIdeasFromOneUser(id);
    return c.json({ idea: idea });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};

export const getAllIdeas = async (c: Context) => {
  try {
    const ideas = await ideaModel.getAllIdeas();
    return c.json({ idea: ideas });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};
export const deleteIdea = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const idea = await ideaModel.deleteIdea(id);
    return c.json({ idea: idea });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};
export const reframer = async (c: Context) => {
  try {
    const { id, regret ,unframed_regret} = await c.req.json();
    
    const prompt = `Reframe this regret into a positive life lesson:\n"${regret}"`;
    
    const response = await axios.post(
      "https://api.deepinfra.com/v1/openai/chat/completions",
      {
        model: "mistralai/Mistral-7B-Instruct-v0.1",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
   
    
    const reframed = response.data.choices[0].message.content  ;
    
    
    const idea = await ideaModel.reframeIdea(id, reframed,unframed_regret);
    
    
    
    return c.json({ idea: idea,reframed : reframed });
  } catch (err) {
    return c.json({ error: err }, 500);
  }
};
export const getTodayIdea = async(c:Context) => {
  try{
    const user = c.get('user');
    
    
    const today  = new Date().toISOString().split('T')[0];
    
    
    const userId = user.user.id;
   
    
    const idea = await ideaModel.getTodayIdea(userId,today);
    
    return c.json({idea: idea})
  }
  catch(err){
    return c.json({error : err},500)
  }
} 

export const getIdeaByDay = async(c:Context) => {
  try{
    const user = c.get('user');
    
    
    const {date} = await c.req.json();
    
    const userId = user.user.id;
   
    
    const idea = await ideaModel.getTodayIdea(userId,date);
    
    return c.json({idea: idea})
  }
  catch(err){
    return c.json({error : err},500)
  }
}