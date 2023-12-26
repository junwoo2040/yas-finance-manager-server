/* main.ts */

/* Setup */
import "./setup";

/* Imports */
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis";
import { createClient } from "redis";

import pino from "pino-http";
import logger from "@configs/logger";

import apiRouter from "@routes/api";
import testRouter from "@routes/test";

/* Extend SessionData type from express-session */
declare module "express-session" {
  interface SessionData {
    userId: string;
    isAdmin: boolean;
  }
}

/* Environment variables */
const ENV = process.env.NODE_ENV || "PROD";
const PORT = process.env.PORT || 8000;

/* Initialize app */
const app = express();

/* CORS setup */
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://localhost:5173",
      "http://127.0.0.1:8000",
      "http://localhost:8000",
    ],
    credentials: true,
  }),
);

/* Cookie parser setup */
app.use(cookieParser());

/* Body parser setup */
app.use(bodyParser.json());

/* Logger setup */
// app.use(pino({ transport: { target: "pino-pretty" } }));

/* Redis connection */
const redisClient = createClient();
redisClient.connect();

/* Session setup */
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "session",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

/* Routes */
app.use("/api", apiRouter);
app.use("/test", testRouter);

/* Run server */
app.listen(PORT, () => {
  logger.info("Server started");

  logger.info(ENV === "DEV" ? "Development" : "Production");
});
