import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from './email.service';



describe( 'EmailService', () => {

  const mockSendMail = jest.fn();

  // Mock al createTransport. Lo modificamos de modo que su metodo original sendMail ahora hará referencia a mockSendMail (na simple funcion jest.fn())
  nodemailer.createTransport = jest.fn().mockReturnValue( {
    sendMail: mockSendMail
  } );

  const emailSevice = new EmailService();// emailService tendrá una propiedad privada llamada transporter que es un objeto (devuelto por nodemailer.createTransport) que tendrá el metodo sendMail pero ya mockeado


  test( 'should send email', async () => {


    const options: SendEmailOptions = {
      to: 'cristian@google.com',
      subject: 'Test',
      htmlBody: '<h1>Test</h1>'
    };

    await emailSevice.sendEmail( options );// Dentro del metodo sendEmail se llamara o ejecutara sendMail (mockSendMail) de la propiedad privada transporter

    // Simplemente verificar si sendMail se mandó a llamar con el objeto esperado
    expect( mockSendMail ).toHaveBeenCalledWith( {
      attachments: expect.any( Array ),
      html: "<h1>Test</h1>",
      subject: "Test",
      to: "cristian@google.com",
    } );

  } );

  test( 'should send email with attachements', async () => {

    const email = 'fernando@google.com';
    await emailSevice.sendEmailWithFileSystemLogs( email );

    const htmlBody = `
    
    <h3>Logs de sistema - NOC</h3>
    <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
    <p>Ver logs adjuntos</p>

    `;

    expect( mockSendMail ).toHaveBeenCalledWith( {
      to: email,
      subject: "Logs del servidor",
      html: htmlBody,
      attachments: expect.arrayContaining( [
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
      ] )
    } );



  } );


} );