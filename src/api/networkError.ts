interface NetwotkErrorParams {
  message?: string;
  status?: number;
  statusText?: string;
  data?: any;
}

export interface INetworkError {
  message?: string;
  status?: number;
  data?: any;
  name: string;
}

class NetworkError implements INetworkError {
  public name = 'NetworkError';
  public message?: string;
  public status?: number;
  public data?: any;

  public constructor({ status, message, data, statusText }: NetwotkErrorParams) {
    this.message = message || statusText;
    this.status = status;
    this.data = data;
  }
}

export default NetworkError;
