export enum ResponseCode {
    OK = '2000000',
    MISSING_MANDATORY_FIELD = '4000001',
    INVALID_FIELD_FORMAT = '4000002',
    UNAUTHORIZED = '4010000',
    SERVER_GENERAL_ERROR = '5000000',
  }
  
  export function getMessage(responseCode: ResponseCode): string {
    switch (responseCode) {
      case ResponseCode.OK:
        return 'OK';
      case ResponseCode.MISSING_MANDATORY_FIELD:
        return 'Missing mandatory field';
      case ResponseCode.INVALID_FIELD_FORMAT:
        return 'Invalid field format';
      case ResponseCode.UNAUTHORIZED:
        return 'Unauthorized';
      case ResponseCode.SERVER_GENERAL_ERROR:
        return 'General server error';
      default:
        return 'Unknown error';
    }
  }
  