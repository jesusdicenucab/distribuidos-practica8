export interface IApplicationResponse<T> {
  message: string;
  ok: boolean;
  data: T[];
}
