import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogSeverityLevel, LogEntity } from '../../domain/entities/log.entity';


const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,// SeverityLevel es la propia enumeracion de postgres
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {


  async saveLog(log: LogEntity): Promise<void> {
    
    const newLog = await prisma.logModel.create({
      data: {
        ...log, 
        level: severityEnum[log.level]
      }
    });
 
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prisma.logModel.findMany({
      where: {
        level: level
      }
    });// esto es equivalente a select * from LogModel where level='Medium';
   
    const logs = dbLogs.map(LogEntity.fromObject);

    return logs;
  }


} 
