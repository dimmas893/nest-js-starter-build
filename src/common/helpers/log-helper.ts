import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class LogHelper {
  private static logger = new Logger('LogHelper');

  static info(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'txt'): void {
    this.writeLog('log', logPath, message, context, format);
  }

  static error(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'txt'): void {
    this.writeLog('error', logPath, message, context, format);
  }

  static warning(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'txt'): void {
    this.writeLog('warn', logPath, message, context, format);
  }

  static critical(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'txt'): void {
    this.writeLog('error', logPath, message, context, format);  // Map to error
  }

  static emergency(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'txt'): void {
    this.writeLog('error', logPath, message, context, format);  // Map to error
  }

  private static writeLog(
    level: 'log' | 'error' | 'warn' | 'debug' | 'verbose',
    logPath: string,
    message: string,
    context: any,
    format: 'json' | 'txt',
  ): void {
    const logDirectory = path.join(process.cwd(), 'storage/logs', logPath);
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }

    const fileName = new Date().toISOString().slice(0, 10) + (format === 'json' ? '_log.json' : '_log.txt');
    const filePath = path.join(logDirectory, fileName);

    const trace = this.getTrace();  // Perbaikan pada method getTrace()

    const logMessage = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      message: message,
      context: {
        ...context,
        trace_class: trace.className,  // Nama class atau method yang melakukan logging
        trace_line: trace.line,  // Nomor baris dari tempat logging dipanggil
      },
    };

    let logOutput: string;
    if (format === 'json') {
      logOutput = JSON.stringify(logMessage, null, 2) + '\n';  // JSON format
    } else {
      logOutput = `[${logMessage.timestamp}] [${logMessage.level}] ${logMessage.message} ${JSON.stringify(logMessage.context)}\n`;  // TXT format
    }

    fs.appendFileSync(filePath, logOutput);

    // Log ke console dengan format JSON atau TXT
    switch (level) {
      case 'log':
        this.logger.log(logOutput);
        break;
      case 'error':
        this.logger.error(logOutput);
        break;
      case 'warn':
        this.logger.warn(logOutput);
        break;
      case 'debug':
        this.logger.debug(logOutput);
        break;
      case 'verbose':
        this.logger.verbose(logOutput);
        break;
    }
  }

  private static getTrace(): { className: string | null; line: number | null } {
    const stack = new Error().stack?.split('\n') || [];
  
    // Mulai pencarian dari baris ke-3 untuk melewati pembuatan Error dan method logging
    for (let i = 3; i < stack.length; i++) {
      // Melewati baris yang berkaitan dengan LogHelper dan method logging internal
      if (!stack[i].includes('LogHelper') && !stack[i].includes('writeLog') && !stack[i].includes('info') && !stack[i].includes('getTrace')) {
        const matches = stack[i].match(/at (\S+) \((.*):(\d+):\d+\)/);
        if (matches) {
          const fullClassName = matches[1];  // Nama class atau method lengkap
          const lineNumber = parseInt(matches[3], 10);  // Ambil nomor baris
          return {
            className: fullClassName,
            line: lineNumber,
          };
        }
      }
    }
    return { className: null, line: null };
  }
  
  
}
