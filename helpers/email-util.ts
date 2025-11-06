import nodemailer from 'nodemailer';
import sysConfig from '../configs/systemt-configs';

export default class EmailUtil {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: sysConfig.email_service,
            pass: "ltgk erih inxx rdzz"
        }
    });

    async sendEmail(tos: string[], subject: string, text: string, html: any, attachments: any) {
        try {
            const mailOptions = {
                from: sysConfig.email_service,
                bcc: tos,
                subject,
                text: (text || '').replace(/&nbsp;/g, ' '),
                html,
                attachments,
            };

            const info = await this.transporter.sendMail(mailOptions);
            if (info) {
                return {
                    message_id: info.messageId,
                    response_id: info.response,
                };
            }
        } catch (error) {
            throw error;
        }
    }
}
