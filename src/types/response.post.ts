export interface ResponsePOST<T> {
  status: number;
  message: string;
  data: T | null;
}
