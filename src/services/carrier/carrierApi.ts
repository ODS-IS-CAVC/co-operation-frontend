import http, { CustomOptions } from '@/lib/http';

const BASE_URL = process.env.NEXT_PUBLIC_API_CARRIER;

export class CarrierApi {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return http.get<Response>(url, {
      baseUrl: BASE_URL,
      ...options,
    });
  }

  post<Response>(url: string, body?: any, options?: Omit<CustomOptions, 'body'>) {
    return http.post<Response>(url, body, {
      baseUrl: BASE_URL,
      ...options,
    });
  }

  put<Response>(url: string, body?: any, options?: Omit<CustomOptions, 'body'>) {
    return http.put<Response>(url, body, {
      baseUrl: BASE_URL,
      ...options,
    });
  }

  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return http.delete<Response>(url, {
      baseUrl: BASE_URL,
      ...options,
    });
  }
}
