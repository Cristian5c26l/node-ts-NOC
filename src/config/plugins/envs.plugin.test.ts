import { envs } from './envs.plugin';


describe('envs.plugin.test.ts', () => {

    test('should return env options', () => {
        // console.log(envs);
        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'cristianhernandezresendiz@gmail.com',
            MAILER_SECRET_KEY: '123123123',
            PROD: false,
            MONGO_URL: 'mongodb://cristian:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'cristian',
            MONGO_PASS: '123456789'
        });

    });

    test('should return error if not found env', async() => {
        // console.log({PORT: process.env.PORT});// Imprime { PORT: '3000' }
        jest.resetModules();// Esto se coloca para que la proxima vez que se importe cualquier modulo (como el modulo envs.plugin.ts), cargue dicho modulo, es decir, ejecute sus instrucciones de dicho modulo desde el propio codigo fuente (envs.plugin.ts) en lugar de cargarlo desde la cache (en la cache ya estaria el modulo envs.plugin.ts cargado)
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');// importar o cargar modulo envs.plugin.ts
            expect(true).toBeFalsy();
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });

});