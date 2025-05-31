import { db } from "../index.ts";

// model Idea {
//   id              String   @id @default(uuid())
//   regret          String
//   reframed_regret String?
//   createdAt       DateTime @default(now())
//   updatedAt       DateTime @updatedAt
//   user            User?    @relation(fields: [userId], references: [id])
//   userId          String?
// }
export const createIdea = async (data: { regret: string }) => {
  const idea = await db.idea.create({
    data: {
      regret: data.regret,
    },
  });
  return idea;
};

export const getAllIdeas = async () => {
  const ideas = await db.idea.findMany();
  return ideas;
};

export const getIdeasFromOneUser = async (id: string) => {
  const idea = await db.idea.findUnique({
    where: { id },
  });
  return idea;
};

export const editIdea = async (id: string, regret: string) => {
  const idea = await db.idea.update({
    where: { id },
    data: {
      regret: regret,
    },
  });
  return idea;
};
export const deleteIdea = async (id: string) => {
  const idea = await db.idea.delete({
    where: { id },
  });
  return idea;
};

export const reframeIdea = async (id: string, reframed_regret: string) => {
  const idea = await db.idea.update({
    where: { id: id },
    data: { reframed_regret: reframed_regret },
  });
  return idea;
};

export const getTodayIdea = async (userId: string, today: string) => {
  let idea = await db.idea.findFirst({
    where: {
      userId: userId,
      createdAt: {
        gte: new Date(today),
      },
    },
  });
  if (!idea) {
    idea = await db.idea.create({
      data: {
        userId: userId,
        regret: "",
        reframed_regret: "",
      },
    });
  }
  return idea
};
