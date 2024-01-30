import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo/';


export class MongoLogDatasource implements LogDatasource{

  async saveLog(log: LogEntity): Promise<void> {

    
    // Creación de documento con forma LogModel para que se grabe en coleccion "Logs" (crea y guarda) 
    const newLog = await LogModel.create(log);

    // En este punto, newLog es una instancia de nuestro modelo de mongo LogModel.

    // Para ASEGURARSE de que se graba esa insercion de dicho documento en colección Logs, es necesario ejecutar el metodo save.
    // await newLog.save();

  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      
    // Obtener todos los registros de la coleccion logs ubicada en la base de datos NOC
    const logsBySeverityLevel = await LogModel.find({
      level: severityLevel
    });

    return logsBySeverityLevel.map(LogEntity.fromObject);

  }


}

