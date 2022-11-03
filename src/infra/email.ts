import Mailjet from "node-mailjet";




interface Recipients{
    Email: string;
}


export interface SendMailParams{
    fromEmail: string;
    fromName: string;
    subject: string;
    text?: string ;
    html?: string;
    recepients: Recipients[]
}

export const sendMail = ({
    fromEmail,
    fromName,
    subject,
    text,
    html,
    recepients
}: SendMailParams) =>{
    const apikey = process.env.MAILJET_APIKEY;
    const secretkey = process.env.MAILJET_SECRETKEY;

    const mailjet = Mailjet.apiConnect(apikey!, secretkey!);
    const send = mailjet.post('send');
    const promise = send.request({
        FromEmail: fromEmail,
        FromName: fromName,
        Subject: subject,
        'Text_part': text,
        'html-part': html,
        Recepients: recepients
        
    });
    return promise;
};
