import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express, { Request, Response, Application } from "express";

import messageRouter from "./routes/messageRoute";

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", messageRouter);
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Twilio WhatsApp API");
    });

export default app;
