import fs from "fs"
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource{

  // Mi propia logica de guardado de logs 
  private readonly logPath = "logs/";
  private readonly allLogsPath    = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath   = "logs/logs-high.log";

  
  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {

    if ( !fs.existsSync( this.logPath ) ) {
      fs.mkdirSync( this.logPath );
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath, 
    ].forEach(path => {
      if (fs.existsSync(path)) return;

      fs.writeFileSync(path, "");// El string vacio es para insertarlo en el archivo path (path puede )
    });// Usar esto para aplicar el principio don't repeat yourself

    

  }

  // Este metodo puede ser sincrono si asi lo deseo
  async saveLog( newLog: LogEntity ): Promise<void> {

    const logAsJson = `${JSON.stringify(newLog)}\n`;// con esta linea, evitamos la deuda tecnica de no usar un JSON.stringify a cada rato. Asi, si despues queremos cambiar el formato de guardado, solo cambiamos esta linea y no todas las lineas donde se usa JSON.stringify

    // Agregar log al final del archivo logs-all.log 
    fs.appendFileSync( this.allLogsPath, logAsJson );

    // Winston hace lo mismo que yo, es decir, serializa el objeto a un string que consiste de un JSON y lo guarda en un archivo
    // QUe hace JSON.stringify? Convierte un objeto a un string que consiste de un JSON. EJemplo:
    // const person = { name: "Juan", age: 20 };
    // const personString = JSON.stringify(person);
    // console.log(personString); // {"name":"Juan","age":20}
    
    if ( newLog.level === LogSeverityLevel.low ) return;

    if ( newLog.level === LogSeverityLevel.medium ) {
      fs.appendFileSync( this.mediumLogsPath, logAsJson );
    } else {
      fs.appendFileSync( this.highLogsPath, logAsJson );
    }
  }
  
  // getLogsFromFile es un metodo privado, es decir, solo puede ser usado dentro de esta clase. Se usa para aplicar don't repeat yourself
  private getLogsFromFile = ( path: string ): LogEntity[] => { 
    
    const content = fs.readFileSync(path, "utf8");// content sera un string

    // content luce algo asi: 
    //
    // {"level":"low","message":"Hola mundo","timestamp":"2021-08-18T03:00:00.000Z"}
    // {"level":"low","message":"Hola mundo","timestamp":"2021-08-18T03:00:00.000Z"}
    // {"level":"low","message":"Hola mundo","timestamp":"2021-08-18T03:00:00.000Z"}
    // {"level":"low","message":"Hola mundo","timestamp":"2021-08-18T03:00:00.000Z"}
    
    if (content === "") return [];

    const logsAsJson = content.split("\n");// el metodo split de un string separa el string en un arreglo de strings. En este caso, separa el string content en un arreglo de strings donde cada string es un log en formato JSON. Gracias a \n (new line) se puede saber donde termina un log y empieza otro
    
    // return logsAsJson.map((logAsJson) => LogEntity.fromJson(logAsJson));
    

    return logsAsJson.map(LogEntity.fromJson);// Es lo mismo que la linea de arriba, pero mas corto. En javascript, si una funcion recibe un solo parametro, y dicha funcion solo tiene una linea de codigo que consiste de pasar dicho parametro a otra funcion, entonces, esta permitido solo colocar el nombre de esa otra funcion. 
    


  }

  async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
    
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile( this.allLogsPath );
      case LogSeverityLevel.medium:
        return this.getLogsFromFile( this.mediumLogsPath );
      case LogSeverityLevel.high:
        return this.getLogsFromFile( this.highLogsPath );
      default:
        throw new Error(`${severityLevel} not implemented`);
    }
    
  }



} 
