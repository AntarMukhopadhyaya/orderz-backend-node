import { Router } from "express";
import { sendMessage } from "../controllers/messageController";

const messageRouter:Router = Router();

messageRouter.post("/send-message",sendMessage)

export default messageRouter;