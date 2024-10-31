import { Request, Response } from "express";
import twilioService from "../services/twilioService";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";

export const sendMessage = async (req: Request, res: Response) => {
    console.log(req)
    console.log("Request Body:", req.body);
  const incomingQuestion = req.body.Body?.toLowerCase();
  const senderNumber = req.body.From;

  let answer: string;

  if (incomingQuestion === "yes") {
    answer = "You selected Yes";
  } else if (incomingQuestion === "no") {
    answer = "You selected No";
  } else {
    answer = "Invalid response";
  }
  console.log("Question from User:", incomingQuestion);
  console.log("Sender Number:", senderNumber);
  console.log("Answer:", answer);
  const botResponse = new MessagingResponse();
  const message = botResponse.message(answer);


  try {
    await twilioService.sendWhatsAppMessage(senderNumber, answer, {});
    res.set("Content-Type", "application/xml");
    res.send(botResponse.toString());
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ error: "Error sending message" });
  }


};
