import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}

// type SuccessCallback = () => void;
type SuccessCallback = (( url: string ) => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined; 

export class CheckService implements CheckServiceUseCase{
  
  // Inyeccion de dependencias 
  constructor(
    private readonly logRepository: LogRepository,// Con esta linea, que no es LogRepositoryImpl, nos aseguramos de que logRepository sea una instancia de cualquier repositorio que implemente la clase abstracta LogRepository. No se trabaja directamente con los datasources, sino que se acceden a ellos mediante los repositorios. RECORDAR QUE LOS CASOS DE USOS (COMO EN ESTE CASO CheckService) LLEGAN AL REPOSIORIO Y EL REPOSIORIO LLEGA AL DATASOURCE
    private readonly successCallback: SuccessCallback,// sucessCallback sera la implementacion de una funcion que recibe un parametro llamado url de tipo string pero que dicha funcion no retorna algo pero si puede tener instrucciones
    private readonly errorCallback: ErrorCallback 
  ) {}

  // Teoricamente hablando a nivel de clase, cualquier objeto de CheckService tendrá las propiedades successCallback y errorCallback, las cuales serán funciones de tipo SuccessCallback y ErrorCallback respectivamente. errorCallback tendrá referencia a una funcion que reciba un parametro de tipo string llamado error y no retorne nada. successCallback tendrá referencia a una funcion (como puede ser funcion de flecha) que reciba un parametro de tipo string llamado url y no retorne nada.
  
  // Dado que successCallback y errorCallback son privados, no se pueden acceder desde fuera de la clase. Para acceder a ellas se deben usar desde un metodo como execute el cual viva en la misma clase.
  // Dado que successCallback y errorCallback son readonly, no se pueden modificar ni desde fuera de la clase ni desde dentro de la clase. Solo se pueden modificar en el constructor de la clase.

  public async execute( url: string ): Promise<boolean> {


    // const originPath = __filename.split("/");
    // const origin = originPath[originPath.length - 1] || "check-service.ts";
    
    try {
      const resp = await fetch( url );
      
      if (!resp.ok) {
        throw new Error( `Error on check service ${ url }` );// throw new Error(`https://espanol.cgtn.com/specials/2024/CAVPgEHWmS4U89ZQeeuPU9r1240103/1b97c291-459d-43a3-b2a6-c369711faf4e.mp4`) redirige el flujo de ejecución al catch, el cual recibe el error (https://espanol.cgtn.com/specials/2024/CAVPgEHWmS4U89ZQeeuPU9r1240103/1b97c291-459d-43a3-b2a6-c369711faf4e.mp4) y lo imprime en consola.
      }
      
      // Uso del repositorio del log
      // const newLog = new LogEntity(`Service ${ url } working`, LogSeverityLevel.low);// low es algo que no es critico. Si el servicio funciona, no es critico
      // const origin = 'check-service.ts';
     // const originPath = __filename.split("/");
      // const origin = originPath[originPath.length - 1] || "check-service.ts";
      const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${ url } working`, 
        origin: 'check-service.ts', 
      });
      this.logRepository.saveLog( newLog );

      // Uso de la inyeccion de dependencia
      this.successCallback && this.successCallback( url );// successCallback podria ser ya una funcion que haga algo más profundo como guardar en una base de datos que el servicio esta ok.

      return true;// Esto es lo mismo que return Promise.resolve( true );

    } catch (error) {
      
      // Uso del repositorio del log (el repositorio del log (LogRepository) sirve para grabar un log)
      const errorMessage = `${ url } is not ok. ${ error }`;
      // const newLog = new LogEntity( errorMessage, LogSeverityLevel.high );// high es algo que es critico. Si el servicio no funciona, es critico
      
      const newLog = new LogEntity({
        message: errorMessage, 
        level: LogSeverityLevel.high,
        origin: 'check-service.ts',
      });

      this.logRepository.saveLog( newLog );

      this.errorCallback && this.errorCallback( errorMessage );
      return false;
    }

  }
}

// Que la clase CheckService implemente la interfaz CheckServiceUseCase significa que la clase CheckService debe tener un método execute que reciba un string y retorne una promesa de booleano. Si esto no sucede, marcará un error.

// La razón de que execute no sea estático es porque se le inyectará una dependencia.

// Recordar la funcion de flecha:
// const fn = ( param1: string, param2: number ): void => {}
// fn( 'hola', 1 );
// const errorCallback = ( error: string ): void => {}
// errorCallback( 'error, google is down' );
