import { AxiosError } from 'axios';
import { ERROR_MESSAGE } from '@/constants/ErrorMessage';

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError)
    if (error.response?.data?.code as keyof typeof ERROR_MESSAGE) {
      return ERROR_MESSAGE[error.response?.data.code] || ERROR_MESSAGE['A000'];
    } else {
      return error.message;
    }
  if (error instanceof Error) return error.message;

  return String(error);
}
