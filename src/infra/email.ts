import Mailjet from "node-mailjet";




interface Recipients{
    Email: string;
    Name?: string
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
    const send = mailjet.post('send', {version: 'v3.1'});
    const promise = send.request({
        Messages:[ {From:{
            Email: fromEmail,
            Name: fromName
        },
        
        Subject: subject,
        'TextPart': text,
        'HTMLPart': html,
        To: recepients}]
        
    });
    return promise;
};
