import { QueryClient } from '@tanstack/react-query';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  return instance;
};

export const BASE_URL = 'https://api.example.com';
// TODO: 추후 서버 API 주소 변경 필요

interface Engineers {
  [key: string]: string;
}

const engineers: Engineers = {
  '박민규': 'https://backend.lee.com', // 실제 URL로 대체 필요
  '모아림': 'https://backend.park.com', // 실제 URL로 대체 필요
  '조홍식': 'https://backend.seo.com',  // 실제 URL로 대체 필요
};

let currentBaseUrl = engineers['박민규'];

export const setApiBaseUrl = (engineer: string) => {
  currentBaseUrl = engineers[engineer];
  fetchInstance.defaults.baseURL = currentBaseUrl;
};

export const fetchInstance = initInstance({
  baseURL: currentBaseUrl,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
  },
});
