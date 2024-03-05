import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,  
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  });

  constructor() {}

  // Si sendEmail() retorna una promesa que resuelve un valor booleano, entonces, sendEmail debe ser async
  async sendEmail( options: SendEmailOptions ): Promise<boolean> {    
    
    const {to, subject, htmlBody, attachments = [] } = options;

    try {
      // EL metodo sendMail del objeto transporter envia el correo al destinatario (to). Dicho metodo retorna una promesa que contiene informacion de si dicho correo s envio, el peso del correo, si lo recibio, etc.
      
      const sentInformation = await this.transporter.sendMail({
        to, 
        subject,
        html: htmlBody, 
        attachments
      });

      // console.log(sentInformation);// Muestra informacion de si el correo se envio, el peso del correo, si lo recibio, etc.
      return true;
    } catch (error) {
      return false;
    }
    
  }

  async sendEmailWithFileSystemLogs( to: string | string[] ) {
    
    const subject = "Logs del servidor";

    const htmlBody = `
    
    <h3>Logs de sistema - NOC</h3>
    <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
    <p>Ver logs adjuntos</p>

    `;

    const attachments: Attachment[] = [
      {
        filename: 'logs-all.log',
        path: './logs/logs-all.log'
      },
      {
        filename: 'logs-high.log',
        path: './logs/logs-high.log'
      },
      {
        filename: 'logs-medium.log',
        path: './logs/logs-medium.log'
      }
    ];

    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments
    });

  }

}
