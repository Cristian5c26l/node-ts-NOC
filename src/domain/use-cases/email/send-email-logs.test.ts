import nodemailer from 'nodemailer';
import {SendEmailLogs} from './send-email-logs';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity } from '../../entities/log.entity';

describe('SendEmailLogs UseCase', () => {

    const mockEmailServiceInstance = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),

    }

    const mockLogRepositoryInstance: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
        mockEmailServiceInstance as any,
        mockLogRepositoryInstance
    );

    beforeEach(() => {
        jest.clearAllMocks();// Limpiar las mock functions (jest.fn). Esto asegura borrar el registro de todas las llamadas realizadas a todas las funciones simuladas (jest.fn()).
    });

    test('should call sendEmail (with system...) and saveLog', async() => {
        const result = await sendEmailLogs.execute('cristian5464@outlook.com');// execute internamente llama a la funcion sendEmailWithFileSystemLogs que es una funcion mock o simulada del objeto simulado EmailService que retorna un true

        expect(result).toBe(true);
        expect(mockEmailServiceInstance.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);

        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalled();
        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledTimes(1);
        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledWith(
            {
                level: 'low',
                message: 'Log Email sent successfully', 
                origin: 'send-email-logs.ts',
                timestamp: expect.any(Date)
            }
        );

    });

    test('should log in case of error', async() => {

        // Forzar a que la funcion sendEmailWithFileSystemLogs del objeto simulado de la instancia EmailService retorne false para asi redirigir el flujo del programa
        mockEmailServiceInstance.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('cristian5464@outlook.com');// execute internamente llama a la funcion sendEmailWithFileSystemLogs que es una funcion mock o simulada del objeto simulado EmailService que retorna un true

        expect(result).toBe(false);
        expect(mockEmailServiceInstance.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);

        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalled();
        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledTimes(1);
        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        );
        expect(mockLogRepositoryInstance.saveLog).toHaveBeenCalledWith(
            {
                level: 'high',
                // message: expect.any(String), 
                message: 'Error: Email log not sent',
                origin: 'send-email-logs.ts',
                timestamp: expect.any(Date)
            }
        );

    });

});