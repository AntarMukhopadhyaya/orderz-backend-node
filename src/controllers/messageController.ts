import { Request, Response } from "express";
import twilioService from "../services/twilioService";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";

export const sendMessage = async (req: Request, res: Response) => {
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
    await twilioService.sendWhatsAppMessage(senderNumber, answer, {
      "1": "Alu_Potel",
      "2": "potol",
    });
    res.set("Content-Type", "application/xml");
    res.send(botResponse.toString());
  } catch (error) {
    console.error("Error sending message", error);
    res.status(500).json({ error: "Error sending message" });
  }

  // const {to, message} = req.body;
  // if(!to || !message){
  //     res.status(400).json({error:'Missing "to" or "message" fields'});
  //     return;
  // }
  // try {
  //     await sendWhatsappMessage(to,message);
  //     res.status(200).json({success:'Message sent successfully'});
  // }catch(error){
  //     res.status(500).json({error:'Error sending message'});
  // }
};
