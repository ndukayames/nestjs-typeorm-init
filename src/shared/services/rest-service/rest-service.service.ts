import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RestServiceService {
  constructor(private readonly httpService: HttpService) {}

  async call<T>(
    method: 'get' | 'post' | 'patch' | 'put',
    url: string,
    data?: any,
    headers?: { [key: string]: string },
  ): Promise<T> {
    const config: AxiosRequestConfig = { headers: headers || {} };

    try {
      const response: AxiosResponse<T> = await lastValueFrom(
        this.httpService[method](url, data, config),
      );
      return response.data;
    } catch (error) {
      throw new BadRequestException(`Error from API`); // refactor error handling
    }
  }

  async getWithoutHeaders<T>(url: string): Promise<T> {
    return await this.call<T>('get', url);
  }

  async getWithHeaders<T>(
    url: string,
    headers?: { [key: string]: string },
  ): Promise<T> {
    return await this.call<T>('get', url, undefined, headers);
  }

  async postWithoutHeaders<T>(url: string, data?: any): Promise<T> {
    return await this.call<T>('post', url, data);
  }

  async postWithHeaders<T>(
    url: string,
    data?: any,
    headers?: { [key: string]: string },
  ): Promise<T> {
    return await this.call<T>('post', url, data, headers);
  }

  async patchWithoutHeaders<T>(url: string, data?: any): Promise<T> {
    return await this.call<T>('patch', url, data);
  }

  async patchWithHeaders<T>(
    url: string,
    data?: any,
    headers?: { [key: string]: string },
  ): Promise<T> {
    return await this.call<T>('patch', url, data, headers);
  }

  async putWithoutHeaders<T>(url: string, data?: any): Promise<T> {
    return await this.call<T>('put', url, data);
  }

  async putWithHeaders<T>(
    url: string,
    data?: any,
    headers?: { [key: string]: string },
  ): Promise<T> {
    return await this.call<T>('put', url, data, headers);
  }
}
