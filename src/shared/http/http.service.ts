import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ErrorResponse } from './interfaces/http.interface';
@Injectable()
export class CustomHttpService {
  constructor(private readonly httpService: HttpService) {}

  private handleError(error: unknown): never {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Unexpected error occurred';
    function isErrorResponse(obj: ErrorResponse): obj is ErrorResponse {
      return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.status === 'number' &&
        'data' in obj
      );
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      isErrorResponse(error.response as ErrorResponse)
    ) {
      const response = error.response as ErrorResponse;
      status = response.status;
      message = response.data;
    } else if (error instanceof Error) {
      message = error.message;
    }

    throw new HttpException(message, status);
  }

  async get<T>(url: string, headers = {}): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.get<T>(url, { headers }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post<T>(url: string, data: any, headers = {}): Promise<T> {
    try {
      const response = await lastValueFrom(
        this.httpService.post<T>(url, data, { headers }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
