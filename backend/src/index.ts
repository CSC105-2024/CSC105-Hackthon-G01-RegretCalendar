import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/index.js'
import { cors } from 'hono/cors'
import { setupSocketIO } from "./socket/server.ts";
import { Server as SocketIOServer } from "socket.io";
import ideaRoute from "./route/ideaRoute.ts"
import userRoute from "./route/userRoute.ts"
import dailyLogRoute from "./route/dailyLogRoute.ts"
import http from "http";
const app = new Hono()
export const db = new PrismaClient();
function nodeRequestToReadable(
  req: http.IncomingMessage
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      req.on("data", (chunk) => controller.enqueue(new Uint8Array(chunk)));
      req.on("end", () => controller.close());
      req.on("error", (err) => controller.error(err));
    },
  });
} 

app.use(cors({
  origin: 'http://localhost:5173', // don't use '*'
  credentials: true               // allow cookies, auth headers, etc.
}));
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route("/idea",ideaRoute);
app.route('/user',userRoute);
app.route('/dailyLog',dailyLogRoute)

const handler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = `http://${req.headers.host}${req.url}`;

  const request = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body:
      req.method === "GET" || req.method === "HEAD"
        ? undefined
        : nodeRequestToReadable(req),
    duplex: "half",
  } as RequestInit & { duplex: "half" }); // allows 'du)

  const response = await app.fetch(request);

  res.writeHead(
    response.status,
    Object.fromEntries(response.headers.entries())
  );
  res.end(await response.text());
};
const server = http.createServer(handler);
export const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // adjustable
  },
});
setupSocketIO(io);

server.listen(3001, () => {
  console.log(`Server running at http://localhost:${3001}`);
});

