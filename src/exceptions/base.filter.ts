import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { PinoLoggerService as Logger } from '../pino-logger/pino-logger.service';
import { BaseHttpException } from './http-exceptions/base.http-exception';

export type classAndFunction = { class: string, function: string };
export const UNKNOWN_MESSAGE = 'unknown';
/**
 * Base exception filter
 * @description This filter is used to catch all exceptions and return a generic response
 */
@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) { }

  catch(exception: BaseHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus() || 500;

    const errorResponse = exception.getResponse();
    let errorMessage = "";

    if (typeof errorResponse === 'string') {
      errorMessage = errorResponse;
    } else if (typeof errorResponse === 'object' && errorResponse !== null) {
      errorMessage = JSON.stringify(errorResponse);  // 객체를 문자열로 변환
    } else {
      errorMessage = UNKNOWN_MESSAGE;
    }

    let stackInfoArray = Array<classAndFunction>();
    let stackInfo = "";
    let sourceClass = "";
    let sourceFunction = "";

    if (exception.stack) {
      stackInfoArray = this.extractClassesAndFunctions(exception.stack);
      stackInfo = `\n Stack Info: `
        + stackInfoArray.map((item) => `${item.class}.${item.function}\n`).join(' -> ')
    }

    if (exception.sourceClass && exception.sourceFunction) { // sourceClass와 sourceFunction이 존재하면
      sourceClass = exception.sourceClass;
      sourceFunction = exception.sourceFunction;
    } else if (exception.sourceClass) { // sourceClass만 존재하면
      const stackInfoFunction = stackInfoArray.find((item) => item.class === exception.sourceClass); // stackInfoArray에서 sourceClass와 동일한 클래스를 찾음
      if (stackInfoFunction) { // 찾았으면
        sourceClass = stackInfoFunction.class;
        sourceFunction = stackInfoFunction.function;
      } else { // 못찾았으면
        sourceClass = exception.sourceClass;
        sourceFunction = UNKNOWN_MESSAGE;
      }
    } else { // sourceClass와 sourceFunction이 존재하지 않으면
      const stackInfoFunction = stackInfoArray[1]; // stackInfoArray에서 두번째 클래스를 가져옴, 첫번째는 BaseExceptionFilter
      if (stackInfoFunction) { // 가져왔으면
        sourceClass = stackInfoFunction.class;
        sourceFunction = stackInfoFunction.function;
      } else { // 못가져왔으면
        sourceClass = UNKNOWN_MESSAGE;
        sourceFunction = UNKNOWN_MESSAGE;
      }
    }
    this.logger.setContext(`${sourceClass} ${sourceFunction}`);

    let errorMessageWithInfo = errorMessage;
    if (exception.info) {
      errorMessageWithInfo += `\n${JSON.stringify(exception.info)}`;
    }

    this.logger.error(
      `${errorMessageWithInfo}${stackInfo}`,
      exception.stack,
    );

    response.status(status).send({
      statusCode: status,
      error: errorMessage,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      info: exception.info
    });
  }

  protected extractClassesAndFunctions(stack: string): classAndFunction[] {
    const stackLines = stack.split('\n'); // stack 문자열을 줄바꿈으로 분리
    const regex = /at (\w+\.?\w+) \(/; // at 문자열을 기준으로 분리
    const result = Array<classAndFunction>(); // 클래스와 함수를 저장할 배열

    for (let line of stackLines) {
      const match = regex.exec(line);
      if (match && match[1]) {
        const parts = match[1].split('.');
        let className = "";
        let functionName = "";

        if (parts.length > 1) {
          className = parts[0];
          functionName = parts[1];
        } else {
          functionName = parts[0];
        }

        result.push({ class: className, function: functionName });
      }
    }
    return result;
  }
}
