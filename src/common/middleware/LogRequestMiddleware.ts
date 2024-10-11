import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { LogHelper } from '../helpers/log-helper';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4(); // Generate unique request ID
    const { method, originalUrl, headers, body } = req;

    // Log incoming request
    LogHelper.info('request', 'Incoming Request', {
      requestId,
      method,
      path: originalUrl,
      headers,
      body,  // Log request body
    }, 'json');  // Ensure log is in JSON format

    // Override the 'send' function to capture response body
    const originalSend = res.send;
    let chunks: Buffer[] = [];  // Buffer array to store response data chunks

    res.send = function (chunk) {
      if (typeof chunk === 'string') {
        chunks.push(Buffer.from(chunk));  // Convert string to Buffer
      } else {
        chunks.push(chunk);  // Push buffer directly
      }
      return originalSend.apply(res, arguments);
    };

    // Capture the response once it's finished
    res.on('finish', () => {
      const responseBody = Buffer.concat(chunks).toString('utf8');  // Convert Buffer to string

      let parsedResponseBody;
      try {
        // Try to parse the responseBody as JSON
        parsedResponseBody = JSON.parse(responseBody);
      } catch (error) {
        // If parsing fails, leave it as a string
        parsedResponseBody = responseBody;
      }

      // Log the response without trace_class and trace_line
      LogHelper.info('response', 'Outgoing Response', {
        requestId,
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        responseHeaders: res.getHeaders(),
        responseBody: parsedResponseBody,  // Add parsed JSON response body
      }, 'json');  // Ensure response is logged in JSON format
    });

    next();
  }
}
