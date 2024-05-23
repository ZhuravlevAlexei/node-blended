import express from "express";
import { env } from "./utils/env.js";
import { ENV_VARS } from "./constants/constantsApp.js";
import cors from "cors";
import pino from "pino-http";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import contactsRouter from "./routers/contacts.js";

const PORT = env(ENV_VARS, 3000);

export const setupServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ["application/json", "application/vnd.api+json"],
      limit: "250kb",
    })
  );

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.json({
      message: "Contact App is Running",
    });
  });

  app.use(contactsRouter);

  app.use("*", notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
