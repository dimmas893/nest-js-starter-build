import { HttpException } from '@nestjs/common';

export class FormatHelper {
  static logContext(data: Error | HttpException): object {
    if (data instanceof HttpException) {
      return {
        status_code: data.getStatus(),
        response: JSON.stringify(data.getResponse()),  
      };
    }

    if (data instanceof Error) {
      return {
        error_class: data.name,
        error_message: data.message,
        stack_trace: data.stack,
      };
    }

    return {};
  }
}
