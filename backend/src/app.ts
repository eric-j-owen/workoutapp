import "reflect-metadata";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { RedisStore } from "connect-redis";
import session from "express-session";
import cors from "cors";
import { createClient } from "redis";
import mountRoutes from "./api/index.routes.js";
import { errorHandler } from "./middleware/globalErrorHandler.js";
import crypto from "node:crypto";
import type { Request } from "express";

const app = express();

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.connect().catch(console.error);
const redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});

const sessionConfig = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  genid: function (req: Request) {
    return genuuid();
  },
  store: redisStore,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET!,
  rolling: true,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: true,
    maxAge: 60 * 60 * 1000,
  },
};

function genuuid() {
  return crypto.randomUUID();
}

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(session(sessionConfig));
mountRoutes(app);
app.use(errorHandler);

export default app;
