import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {

  public static start() {
    console.log('Server started...');
   
    CronService.createJob(
      '*/5 * * * * *', 
      // () => console.log('Tarea ejecutada cada 5 segundos', new Date())
      () => {

        // new CheckService().execute('https://google.com');
        // new CheckService().execute( 'http://localhost:3000' );
        
        new CheckService(
          (url: string) => console.log(`${url} is ok`),// Con inyectar esta dependencia, se busca que siempre separar responsabilidades 
          (error: string) => console.log(error)
        ).execute( 'https://google.com' );

      }
    );


  }

}
