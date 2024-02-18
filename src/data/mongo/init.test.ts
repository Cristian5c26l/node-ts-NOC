import mongoose from 'mongoose';
import {MongoDatabase} from './init';

describe('init MongoDB', () => {

    afterAll(() => {
        mongoose.connection.close();
    });


    test('should connect to MongoDB', async() => {
        
        // Gracias a que en jest.config.ts en setupFiles esta el archivo setupTests.ts, el cual se encarga de agregar a process.env toda variable de entorno ubicada en el archivo que recibe el objeto config de dotenv, este se ejecutará antes de cada prueba haciendo que process.env ya tenga las variables de entorno
        
        // Forma 1
        // const {MONGO_DB_NAME='', MONGO_URL=''} = process.env;

        // const mongoConnectionStatus = await MongoDatabase.connect({
        //     dbName: MONGO_DB_NAME,
        //     mongoUrl: MONGO_URL
        // });

        // expect(mongoConnectionStatus).toBeTruthy();

        // Forma 2
        const mongoConnectionStatus = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,// "!" es el simbolo de admiracion de not null operator 
            mongoUrl: process.env.MONGO_URL!
        });

        expect(mongoConnectionStatus).toBe(true);
    });

    test('should throw an error', async() => {

        try {
            const mongoConnectionStatus = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,// "!" es el simbolo de admiracion de not null operator 
                mongoUrl: 'mongodb://cristian:123456789@localhostTTTTTTTT:27017'
            });
            expect(true).toBe(false);
        } catch (error) {
            
        }

    });

    
});