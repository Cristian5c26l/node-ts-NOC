import { CronJob } from "cron";

// Es mejor manejar interfaces cuando tenemos objetos con propiedades
// Creacion de mis tipos de datos gracias a typescript
type CronTime = string | Date;
type OnTick = () => void;

export class CronService {


  static createJob(cronTime: CronTime, onTick: OnTick): CronJob {// En clean code, cuando se tienen 3 o mas argumentos, se recomienda recibir un objeto con las propiedades que se necesitan 
      
    const job = new CronJob(cronTime, onTick);
    
    job.start();

    return job;// Se retorna el job porque hay veces que se necesita parar el job (job.stop())

  }


}
