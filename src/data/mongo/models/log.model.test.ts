import mongoose from 'mongoose';
import {LogModel} from './log.model';
import { MongoDatabase } from '../init';
import { envs } from '../../../config/plugins/envs.plugin';

describe('log.model.test.ts', () => {

    // Despues de terminar cada test, cerrar la conexion a la base de datos a la que nos conectamos para asi evitar el warning "A worker process..."
    afterAll(() => {
        mongoose.connection.close();
    });

    // Antes de cada test, conectarse a la base de datos de mongo
    beforeAll(async() => {
        await MongoDatabase.connect({// si hay un await dentro de una funcion sea de flecha o no, debe tener dicha funcion un async a su lado
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        });
    });

    // Probar que LogModel.create efectivamente devuelve un objeto log con las propiedades de LogSchema y las agregadas por defecto por mongo como  el id
    test('should return LogModel', async() => {

        const logData = {
            message: 'test message',
            origin: 'log.model.ts',
            level: 'low'
        };

        const log = await LogModel.create( logData );// Para que esta linea no de error, previamente, antes de esta prueba, hay que conectarse a la base de datos mongo

        // console.log( log );// un objeto que contiene las propiedades timestamp, las propiedades de log y sys valores

        expect( log ).toEqual( expect.objectContaining({
            ...logData,
            timestamp: expect.any(Date),
            id: expect.any(String)
        }) );

        await LogModel.findByIdAndDelete( log.id );

    });

    // Probar que el esquema de LogModel tenga las propiedades configuradas
    test('should return the log schema object', () => {
        const schema = LogModel.schema.obj;

        // console.log(schema);// un objeto que contiene las propiedades message, origin, level y timestamp asi el valor de cada propiedad que es un objeto con la definicion del tipo de dato de cada propiedad.
        
        expect(schema).toEqual(expect.objectContaining({
            message: {
                type: expect.any(Function),//String,
                required: true
            },

            origin: {
                type: expect.any(Function),//String
            },

            level: {
                type: expect.any(Function),//String,
                enum: [ 'low', 'medium', 'high' ],
                default: 'low'
            },

            timestamp: {
                type: expect.any(Function),//Date,
                default: expect.any(Object)
            }
        }));
        
    });

});