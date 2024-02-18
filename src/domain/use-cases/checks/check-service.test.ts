import { LogEntity } from '../../entities/log.entity';
import {CheckService} from './check-service';// Importar sujeto de pruebas

describe('CheckService UseCase', () => {
    
    const mockLogRepositoryInstance = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    };

    const sc = jest.fn();// Solo importa que se llamen, no importa lo que hayan ejecutado
    const ec = jest.fn();// errorCallback (ec), successCallback (sc)

    const checkService = new CheckService(
        mockLogRepositoryInstance,
        sc,// (url: string) => console.log(`${url} is ok`),
        ec// (error: string) => console.log
    );

    beforeEach(() => {
        jest.clearAllMocks();// Limpiar las mock functions (jest.fn). Esto asegura borrar el registro de todas las llamadas realizadas a todas las funciones simuladas (jest.fn()).
    });

    test('should call successCallback when fetch returns true', async() => {

        const wasOk = await checkService.execute('https://google.com');

        // Aserciones
        expect(wasOk).toBe(true);
        expect(sc).toHaveBeenCalled();
        expect(sc).toHaveBeenCalledTimes(1);
        expect(ec).not.toHaveBeenCalled();

        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

    test('should call errorCallback when response not ok', async() => {

        const wasOk = await checkService.execute('https://googleFFFFF.com');

        // Aserciones
        expect(wasOk).toBe(false);
        expect(ec).toHaveBeenCalled();
        expect(ec).toHaveBeenCalledTimes(1);
        expect(sc).not.toHaveBeenCalled();

        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );

    });

});