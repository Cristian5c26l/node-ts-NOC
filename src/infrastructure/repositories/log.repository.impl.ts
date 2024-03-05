import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {
  
  // El repositorio se le inyecta la dependencia logDatasource, que será una instancia de una clase que implemente la clase abstracta LogDatasource
  // logDatasource a su vez es un atributo privado de la clase LogRepositoryImpl
  // logDatasource puede ser FileSystemDatasource o DatabaseDatasource, dependiendo de lo que se le inyecte al constructor de LogRepositoryImpl
  constructor( private readonly logDatasource: LogDatasource ){}

  async saveLog(newLog: LogEntity): Promise<void> {// Si retorna una promesa, el metodo saveLog debe ser async
    return this.logDatasource.saveLog(newLog);// esta funcion no retorna nada, simplemente finaliza (return) pero antes de finalizar, ejecuta la funcion saveLog de logDatasource
  } 

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel); 
  }

}
