import {LogEntity, LogSeverityLevel} from './log.entity';

describe('LogEntity', () => {

    const objData = {
        message: 'Test message',
        level: LogSeverityLevel.high,
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {


        const log = new LogEntity(objData);

        expect( log ).toBeInstanceOf(LogEntity);
        expect(log.level).toBe(objData.level);
        expect(log.message).toBe(objData.message);
        expect(log.origin).toBe(objData.origin);
        expect(log.timestamp).toBeInstanceOf(Date);

    });

    test('should create a LogEntity instance from json', () => {
        const strJson = `{"message":"Service https://google.com working","level":"low","origin": "check-service.ts","timestamp":"2024-01-22T02:52:20.619Z"}`;

        const log = LogEntity.fromJson(strJson);

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.level ).toBe( LogSeverityLevel.low );
        expect( log.message ).toBe( "Service https://google.com working" );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.timestamp ).toBeInstanceOf( Date );
    });

    test('should create a LogEntity instance from Object', () => {
        const log = LogEntity.fromObject(objData);

        expect( log ).toBeInstanceOf(LogEntity);
        expect(log.level).toBe(objData.level);
        expect(log.message).toBe(objData.message);
        expect(log.origin).toBe(objData.origin);
        expect(log.timestamp).toBeInstanceOf(Date);
    });


});