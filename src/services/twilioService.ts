import { Twilio } from "twilio";



class TwilioService {
    private client: Twilio;
    private whatsappNumber: string;
    private contentSid:string;

    constructor(){
        this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
        this.whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER!;
        this.contentSid = process.env.CONTENT_SID!;
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