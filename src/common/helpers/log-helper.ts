import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class LogHelper {
  private static logger = new Logger('LogHelper');

  static info(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'json'): void {
    this.writeLog('log', logPath, message, context, format);
  }

  static error(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'json'): void {
    this.writeLog('error', logPath, message, context, format);
  }

  static warning(logPath: string, message: string, context: any = {}, format: 'json' | 'txt' = 'json'): void {
    this.writeLog('warn', logPath, message, context, format);
  }

  static async writeLog(
    level: 'log' | 'error' | 'warn' | 'debug' | 'verbose',
    logPath: string,
    message: string,
    context: any,
    format: 'json' | 'txt',  // Format parameter
  ): Promise<void> {
    const logDirectory = path.join(process.cwd(), 'storage/logs', logPath);
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }
  
    const fileName = new Date().toISOString().slice(0, 10) + (format === 'json' ? '_log.json' : '_log.txt');  // Adjust file extension based on format
    const filePath = path.join(logDirectory, fileName);
  
    let logMessage;
    if (format === 'json') {
      logMessage = {
        timestamp: new Date().toISOString(),
        level: level.toUpperCase(),
        message: message,
        context,
      };
    } else {
      // Format as txt
      logMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message} ${JSON.stringify(context)}\n`;
    }
  
    try {
      if (format === 'json') {
        // Read existing logs if available
        let logArray: any[] = [];
        if (fs.existsSync(filePath)) {
          const existingLogs = await fs.promises.readFile(filePath, 'utf-8');
          logArray = JSON.parse(existingLogs);
        }
        logArray.push(logMessage);
  
        // Write back to the file
        await fs.promises.writeFile(filePath, JSON.stringify(logArray, null, 2), 'utf-8');
      } else {
        // Append txt format
        await fs.promises.appendFile(filePath, logMessage, 'utf-8');
      }
    } catch (error) {
      console.error('Error writing log:', error);
    }
  
    // Console log the message
    this.logger.log(logMessage);
  }
  
}
