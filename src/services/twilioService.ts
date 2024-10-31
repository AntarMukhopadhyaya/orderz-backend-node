import { Twilio } from "twilio";

// const accountSid = process.env.TWILIO_ACCOUNT_SID || "";

// const authToken = process.env.TWILIO_AUTH_TOKEN || "";
// const twilioNumber = process.env.TWILIO_WHATSAPP_NUMBER || "";
// const client = new Twilio(accountSid,authToken);

// /**
//  * Send a whatsapp message using Twilio API
//  * @param to- Recipent Whatsapp number in the format "whatsapp:+<country code><phone number>"
//  * @param message- Text message to be sent
//  */
// export const sendWhatsappMessage = async(to:string,message:string):Promise<void>  => {
//     try {
//         const response = await client.messages.create ({
//             body: message,
//             from: twilioNumber,
//             to: to
//         });
//         console.log(`Message sent to ${to} with sid ${response.sid}`);
//     }catch(error){
//         console.error(`Error sending message to ${to}`,error);
//     }

// }

class TwilioService {
    private client: Twilio;
    private whatsappNumber: string;
    private contentSid:string;

    constructor(){
        this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
        this.whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER!;
        this.contentSid = process.env.TWILIO_WHATSAPP_TEMPLATE_SID!;
    }
    /**
     * Send a whatsapp message using Twilio API
     * @param to - Recipent's Whatsapp number
     * @param body - Text message to be sent
     */
    public async sendWhatsAppMessage(to: string, body: string, variables?: Record<string, string>): Promise<void> {
        try {
            await this.client.messages.create({
                from: this.whatsappNumber,
                to,
                body,
                contentSid: this.contentSid,
                contentVariables: JSON.stringify(variables || {})
            });
            console.log(`Message sent to ${to}`);
        }catch(error){
            console.error(`Error sending message to ${to}`,error);
            throw error;
        }
    }
}
export default new TwilioService();