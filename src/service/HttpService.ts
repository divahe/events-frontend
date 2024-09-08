import type { AuthResponse, LoginData, RegistrationData, Event } from '@/model/index';
import axios, { type AxiosResponse } from 'axios';
import axiosInstance from '@/helpers/AxiosConfig'

export default class HttpService {
  private static LOGIN_URL = 'login';
  private static EVENTREGISTRATION_URL = 'events/register';
  private static EVENTLIST_URL = 'events';

  private static handleErrorResponse(error: any): {
    status: number;
    error: string;
    data?: any;
  } {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
        return {
          status: error.response.status,
          error: `API Error: ${error.response.status} - ${error.response.statusText}`,
          data: error.response.data,
        };
      } else if (error.request) {
        console.error('API Error: No response received');
        return {
          status: 0,
          error: 'No server response',
        };
      } else {
        console.error('API Error: Request setup error');
        return {
          status: 0,
          error: 'Unexpected error',
        };
      }
    }
    console.error('Unexpected error:', error);
    return {
      status: 0,
      error: 'Unexpected error',
    };
  }

  private static async handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<{
    status: number;
    data?: T;
    error?: string;
  }> {
    try {
      const response = await request;
      console.log("response", response.data)
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error: any) {
      console.log("error", error)
      return this.handleErrorResponse(error);
    }
  }

  static login = async (loginData: LoginData): Promise<{
    status: number;
    data?: AuthResponse;
    error?: string;
  }> => {
    return this.handleRequest<AuthResponse>(
      axiosInstance.post(this.LOGIN_URL, loginData)
    );
  };

  static register = async (registrationData: RegistrationData): Promise<{
    status: number;
    data?: AuthResponse;
    error?: string;
  }> => {
    return this.handleRequest<AuthResponse>(
      axiosInstance.put(this.EVENTREGISTRATION_URL, registrationData)
    );
  }

  static getEvents = async (): Promise<{
    status: number;
    data?: Event[];
    error?: string;
  }> => {
    return this.handleRequest<Event[]>(
      axiosInstance.get(this.EVENTLIST_URL)
    );
  }
}
