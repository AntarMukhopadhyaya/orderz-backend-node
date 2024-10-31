import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, Application } from "express";

import messageRouter from "./routes/messageRoute";

const app: Application = express();

app.use(express.json());

app.use("/api", messageRouter);


export default app;
