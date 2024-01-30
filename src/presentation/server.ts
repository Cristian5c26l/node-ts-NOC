import { envs } from "../config/plugins/envs.plugin";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { CronService } from './cron/cron-service';
import { MongoLogDatasource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogSeverityLevel } from "../domain/entities/log.entity";

// En este punto, realizamos el cambio del datasource
// Instancias de las implementaciones 
// const logRepository = new LogRepositoryImpl(
//   // new FileSystemDatasource()
//   // new MongoLogDatasource()
//   new PostgresLogDatasource()
// );
//


const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const mongoDBLogRepository = new LogRepositoryImpl(
  new MongoLogDatasource()
);
const postgreSQLLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
);





const emailService = new EmailService();

export class Server {

  public static async start() {
    console.log('Server started...');
    
    // Mandar email
    // 
    // console.log( envs );
    // const emailService = new EmailService();
    // emailService.sendEmail({
    //   to: envs.MAILER_EMAIL,// Me lo envio a mi mismo
    //   subject: "Logs de sistema",
    //   htmlBody: `
    //     <h3>Logs de sistema - NOC</h3>
    //     <p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>
    //     <p>Ver logs adjuntos</p>
    //   `
    // });
    
    // emailService.sendEmailWithFileSystemLogs( [envs.MAILER_EMAIL, "cristian5464@outlook.com"] );

    // Mandar email
    // Inyectar dependencia de logRepository 
    // const emailService = new EmailService( fileSystemLogRepository );
    // emailService.sendEmailWithFileSystemLogs( [envs.MAILER_EMAIL, "cristian5464@outlook.com"] );
    
    // Mandar email 
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute([envs.MAILER_EMAIL, "cristian5464@outlook.com"]);

    // Obtener los logs
    // const logs = await logRepository.getLogs(LogSeverityLevel.high);
    // console.log(logs);
    

    // CronService.createJob(
    //   '*/5 * * * * *', 
    //   // () => console.log('Tarea ejecutada cada 5 segundos', new Date())
    //   () => {
    //
    //     // new CheckService().execute('https://google.com');
    //     // new CheckService().execute( 'http://localhost:3000' );
    //     
    //     new CheckService(
    //       logRepository,
    //       (url: string) => console.log(`${url} is ok`),// Con inyectar esta dependencia, se busca que siempre separar responsabilidades 
    //       (error: string) => console.log(error)
    //     // ).execute( 'https://google.com' );
    //     ).execute( 'https://youtubeFFFFFFFFFFFF.com' );
    //     // ).execute( 'http://localhost:3000' );
    //
    //   }
    // );

    CronService.createJob(
      '*/5 * * * * *', 
      // () => console.log('Tarea ejecutada cada 5 segundos', new Date())
      () => {

        // new CheckService().execute('https://google.com');
        // new CheckService().execute( 'http://localhost:3000' );
        

        new CheckServiceMultiple(
          [fsLogRepository, mongoDBLogRepository, postgreSQLLogRepository],
          (url: string) => console.log(`${url} is ok`),// Con inyectar esta dependencia, se busca que siempre separar responsabilidades 
          (error: string) => console.log(error)
        // ).execute( 'https://google.com' );
        ).execute( 'https://github.com' );
        // ).execute( 'http://localhost:3000' );

      }
    );



  }

}
