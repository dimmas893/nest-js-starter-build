import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ResponseCode, getMessage } from '../enums/response-code.enum';

@Injectable()
export class ResponseHelper {
  static generate(
    res: Response,
    responseCode: ResponseCode,
    data: any = {},
    message: string | null = null
  ) {
    const response = {
      response_code: responseCode,
      response_message: message ?? getMessage(responseCode),
      ...data,
    };

    const status = parseInt(responseCode.toString().substring(0, 3), 10);
    return res.status(status).json(response);
  }

  static paginate(
    res: Response,
    items: any[],
    currentPage: number,
    lastPage: number,
    perPage: number,
    total: number,
    data: any = {}
  ) {
    return res.json({
      items,
      current_page: Math.max(1, currentPage),
      last_page: Math.max(1, lastPage),
      per_page: perPage,
      total, 
      ...data,
    });
  }
  
}
