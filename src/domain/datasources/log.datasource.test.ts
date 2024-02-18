import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import {LogDatasource} from './log.datasource';


describe('log.datasource.test.ts', () => {

    const newLog = {
        origin: 'log.datasource.test.ts',
        level: LogSeverityLevel.low,
        message: 'test-message'
    };

    class MockLogDatasource implements LogDatasource {


        async saveLog(newLog: LogEntity): Promise<void> {
            return;
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
        
    }

    test('should test the abstract class', async() => {

        const mockLogDatasource = new MockLogDatasource();
        
        // Aserciones (expects)
        expect( mockLogDatasource ).toBeInstanceOf(MockLogDatasource);
        expect( typeof mockLogDatasource.saveLog ).toBe('function');
        expect( typeof mockLogDatasource.getLogs ).toBe('function');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        const logEntity = LogEntity.fromObject(logs[0]);
        expect(logEntity).toBeInstanceOf( LogEntity );// logs[0] será una instancia de LogEntity si logs[0] es un objeto que tiene la propiedad timestamp o no (timestamp?) y las propiedades origin, level y message.

    });

});