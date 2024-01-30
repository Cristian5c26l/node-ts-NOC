
export enum LogSeverityLevel {// Se exporta LogSeverityLevel para que pueda ser usado en otros archivos
  low = 'low',
  medium = 'medium',
  high = 'high',
}// Si low, medium y high no fueran string, entonces se veria asi: low = 0, medium = 1, high = 2 de forma implicita

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  timestamp?: Date;// timestamp es opcional. Si se recibe, se establece en la instancia de LogEntity, si no se recibe, se establece en la fecha actual
  origin: string;
}

export class LogEntity {
 
  // level es sobre nivel de severidad
  public level: LogSeverityLevel;// level es de tipo LogSeverityLevel, por lo que level solo puede ser low, medium o high
  public message: string;
  public timestamp: Date;// createdAt
  public origin: string;// origin contiene el nombre del archivo donde se generó un nuevo log (una nueva instancia de LogEntity)

  // La clase LogEntity tiene un constructor que recibe un objeto literal de tipo LogEntityOptions, es decir, un objeto que tenga las propiedades level, message, timestamp (propiedad opcional) y origin
  constructor(options: LogEntityOptions){
    const { message, level, timestamp = new Date(), origin } = options; // En caso de que timestamp no esté como propiedad del objeto literal options, se le asigna la fecha actual (new Date())
    this.message = message;
    this.level = level;
    this.timestamp = timestamp;// Cuando se cree el log, se le asigna la fecha actual
    this.origin = origin;
  }

  // Factory constructor el cual permite porque al mandar a llamar este metodo estatico regresará una instancia de LogEntity
  // json contiene algo como esto: {"level":"low","message":"Hola mundo","timestamp":"2021-08-18T03:00:00.000Z"} (es un string)
  static fromJson = (json: string): LogEntity => {
    // const literalObject = JSON.parse(json);// Convierte el string a un objeto de JS
    const { level, message, timestamp, origin } = JSON.parse(json);// Convierte el string a un objeto de JavaScript. JSON.parse es lo opuesto a JSON.stringify
    const log = new LogEntity({
      level,// level: level
      message,// message: message
      timestamp, 
      origin,
    });// Crea una instancia de LogEntity
    //log.timestamp = new Date(timestamp);// Le asigna la fecha que se guardó en el archivo

    return log;

  }

  // fromJson es un metodo que permite crear instancias de LogEntity basado en un string que consite de un JSON
  //

  static fromObject = (object: {[key:string]: any}): LogEntity => {
    const {message, level, timestamp, origin} = object;

    const log = new LogEntity({
      level,
      message,
      timestamp,
      origin
    });

    return log;
  }
}
