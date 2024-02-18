import {CronService} from './cron-service';

describe('CronService', () => {

    const mockTick = jest.fn();

    // jest.clearAllMocks(); // Usar esto cuando se hace mas de un test

    test('should create a job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick);// Cada segundo (* * * * * *), se ejecuta la funcion mockTIck

        setTimeout(() => {

            expect( mockTick ).toHaveBeenCalledTimes(2);
            job.stop()
            done();// Con done indico que la prueba ha finalizado, en este caso, la prueba finalizaria en la funcion asincrona de setTimeOut. La función done() se llama dentro del setTimeout, lo que significa que la prueba espera a que se ejecute todo el código dentro del setTimeout antes de finalizar. 
        }, 2000);// Cada dos segundos, ejecutar el codigo de expect, job.stop() y done()
    });

});