import { IApplicationResponse } from '../../utils/application-response/aplication-response.interface';

export class ApplicationResponse<T> {
  private readonly _data: T[];
  private readonly _message: string;
  private readonly _ok: boolean;

  public constructor(message: string, ok: boolean, data: T[],) {
    this._message = message;
    this._ok = ok;
    this._data = data;
  }

  public GetResponse(): IApplicationResponse<T> {
    return {
      message: this._message,
      ok: this._ok,
      data: this._data
    };
  }

}

