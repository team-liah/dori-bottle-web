import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) return error.response?.data?.message;
  if (error instanceof Error) return error.message;

  return String(error);
}
