import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import {LogRepositoryImpl} from './log.repository.impl';


describe('LogRepositoryImpl', () => {

    const mockLogDatasourceInstance = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDatasourceInstance);

    test('saveLog should call the datasource with arguments', async() => {
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'log.repository.impl.test.ts'
        });

        // const log = {level: LogSeverityLevel.low, message: 'hola'} as LogEntity;

        await logRepositoryImpl.saveLog(log);

        expect(mockLogDatasourceInstance.saveLog).toHaveBeenCalled();
        expect(mockLogDatasourceInstance.saveLog).toHaveBeenCalledTimes(1);
        expect(mockLogDatasourceInstance.saveLog).toHaveBeenCalledWith(log);
    });

    test('getLogs should call the datasource with arguments', async() => {
        
        await logRepositoryImpl.getLogs(LogSeverityLevel.low);

        expect(mockLogDatasourceInstance.getLogs).toHaveBeenCalled();
        expect(mockLogDatasourceInstance.getLogs).toHaveBeenCalledTimes(1);
        expect(mockLogDatasourceInstance.getLogs).toHaveBeenCalledWith(LogSeverityLevel.low);
    });
});