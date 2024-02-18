import {MongoDatabase} from '../../data/mongo/init';
import {envs} from '../../config/plugins/envs.plugin';
import mongoose from 'mongoose';
import {MongoLogDatasource} from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo';


describe('Pruebas en MongoLogDatasource', () => {

    const logDatasource = new MongoLogDatasource();

    const log = new LogEntity({
        level: LogSeverityLevel.medium,
        message: 'Test-Message',
        origin: 'mongo-log.datasource.test.ts'
    });
    
    // Antes de empezar la primera prueba conectarse a la base de datos mongo (esta base de datos se levanta con sudo npm run test:watch)
    beforeAll(async() => {

        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });

    });

    // Despues de cada prueba
    afterEach(async() => {
        await LogModel.deleteMany(); // Eliminar todos los documentos o registros de la coleccion o tabla llamada Logs
    });

    // Despues de todas las pruebas, cerrar conexion a base de datos mongo
    afterAll(() => {


        mongoose.connection.close();
    });

    test('should create a log', async() => {
        const logSpy = jest.spyOn(console, 'log');// En la vida real no se estaria espiando si se llamó un log en la aplicacion ya estando en produccion. Simplemente esta prueba será de forma educativa
        
        // jest.spyOn(console, 'log'); crea un jest function que se encarga de espiar al metodo log del objeto console

        

        await logDatasource.saveLog(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("Mongo log created:", expect.any(String));
    });

    // TOda prueba debe de ser unica, independiente entre si (atomicas) sin depender del resultado de otras pruebas
    test('should get logs', async() => {

        await logDatasource.saveLog(log);
        await logDatasource.saveLog(log);

        const logs = await logDatasource.getLogs(LogSeverityLevel.medium);

        expect(logs.length).toBe(2);
        expect(logs[0].level).toBe(LogSeverityLevel.medium);
    });

});