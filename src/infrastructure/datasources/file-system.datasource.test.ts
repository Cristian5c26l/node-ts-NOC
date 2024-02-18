import fs from "fs";
import path from "path";
import {FileSystemDatasource} from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('FileSystemDatasource', () => {

    // console.log(__dirname);// __dirname contiene la ruta absoluta de este archivo llamado file-system.datasource.test.ts (incluye el nombre del archivo)

    const logsPath = path.join(__dirname, '../../../logs');// con el metodo join del objeto path nos ubicamos en la ruta absoluta del archivo actual y despues nos regresamos 3 carpetas anteriores y abrimos la carpeta logs para que asi logsPath tenga la ruta absoluta del directorio logs del proyecto 05-NOC

    // console.log( logsPath );// /run/media/cristian/Almacenamiento/cursos-devtalles/linux/Node-JS-De-Cero-a-Experto/Node/05-NOC/logs

    // Antes de cada prueba,eliminar directorio logs y todo su contenido
    beforeEach(() => {
        fs.rmSync( logsPath, {recursive: true, force: true} );
    });

    test('should create log files if they do not exists', () => {
        new FileSystemDatasource();// Crear carpeta logs que contenga los archivos 'logs-all.log', 'logs-high.log', 'logs-medium.log'

        const files = fs.readdirSync(logsPath);
        // console.log({files});// files contiene el siguiente arreglo: [ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]

        expect(files).toEqual([ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
    });

    test('should save a log in logs-all.log', () => {

        const logDatasource = new FileSystemDatasource();// Se vuelve a crear carpeta logs, pero con los archivos logs-all.log, logs-high.log y logs-medium.log vacios o sin contenido

        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logsPath}/logs-all.log`, 'utf-8');// allLogs contendra todo el contenido del archivo logs-all.log eb forma de cadena
        // console.log(allLogs);// {"message":"test-message","level":"low","timestamp":"2024-02-12T18:40:20.519Z","origin":"file-system.datasource.test.ts"}


        expect(allLogs).toContain(`{"message":"test-message","level":"low",`);
        expect(allLogs).toContain(JSON.stringify(log));
    });

    test('should save a log in logs-all.log and logs-medium.log', () => {

        const logDatasource = new FileSystemDatasource();// Se vuelve a crear carpeta logs, pero con los archivos logs-all.log, logs-high.log y logs-medium.log vacios o sin contenido

        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logsPath}/logs-all.log`, 'utf-8');// allLogs contendra todo el contenido del archivo logs-all.log eb forma de cadena
        const mediumLogs = fs.readFileSync(`${logsPath}/logs-medium.log`, 'utf-8');
        // console.log(allLogs);// {"message":"test-message","level":"low","timestamp":"2024-02-12T18:40:20.519Z","origin":"file-system.datasource.test.ts"}


        expect(allLogs).toContain(`{"message":"test-message","level":"medium",`);
        expect(allLogs).toContain(JSON.stringify(log));

        expect(mediumLogs).toContain(`{"message":"test-message","level":"medium",`);
        expect(mediumLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log and logs-high.log', () => {

        const logDatasource = new FileSystemDatasource();// Se vuelve a crear carpeta logs, pero con los archivos logs-all.log, logs-high.log y logs-medium.log vacios o sin contenido

        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);

        const allLogs = fs.readFileSync(`${logsPath}/logs-all.log`, 'utf-8');// allLogs contendra todo el contenido del archivo logs-all.log eb forma de cadena
        const highLogs = fs.readFileSync(`${logsPath}/logs-high.log`, 'utf-8');
        // console.log(allLogs);// {"message":"test-message","level":"low","timestamp":"2024-02-12T18:40:20.519Z","origin":"file-system.datasource.test.ts"}


        expect(allLogs).toContain(`{"message":"test-message","level":"high",`);
        expect(allLogs).toContain(JSON.stringify(log));

        expect(highLogs).toContain(`{"message":"test-message","level":"high",`);
        expect(highLogs).toContain(JSON.stringify(log));

    });

    test('should return all logs', async() => {

        const logDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test-message',
            origin: 'file-system.datasource.test.ts'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const allLogs = await logDatasource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await logDatasource.getLogs(LogSeverityLevel.medium);
        const highLogs = await logDatasource.getLogs(LogSeverityLevel.high);

        expect( allLogs ).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect( mediumLogs ).toEqual(expect.arrayContaining([logMedium]));
        expect( highLogs ).toEqual(expect.arrayContaining([logHigh]));

    });

    test('should do nothing if logs/ exists', () => {
        new FileSystemDatasource();
        new FileSystemDatasource();

        expect(true).toBeTruthy();
    });

    test('should return empty array logs', async() => {
        const logDatasource = new FileSystemDatasource();

        const allLogs = await logDatasource.getLogs(LogSeverityLevel.low);
        const mediumLogs = await logDatasource.getLogs(LogSeverityLevel.medium);
        const highLogs = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(allLogs.length).toBe(0);
        expect(mediumLogs.length).toBe(0);
        expect(highLogs.length).toBe(0);
    });

    test('should throw an error if severity level is not defined', async() => {

        const testSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;// 'SUPER_MEGA_HIGH' as LogSeverityLevel se puede hacer gracias a TypeScript. Literalmente, esto sería como hacer que el string 'SUPER_MEGA_HIGH' se trate como un tipo de dato LogSeverityLevel
        

        try {
            await new FileSystemDatasource().getLogs(testSeverityLevel);
            expect(true).toBeFalsy();// No deberia de llegar a este punto, ya que, dentro de getLogs, se estará arrojando un throw, el cual, redirigira el flujo del programa al catch
        } catch (error) {// Si no se cacha el error, en la consola aparecerá Error at y muchas cosas mas (literal se notará como que la aplicacion revienta con un error tremendo)
            expect(`${error}`).toBe(`Error: ${testSeverityLevel} not implemented`);
        }
    });

});