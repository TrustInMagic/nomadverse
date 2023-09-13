import axios, { AxiosRequestConfig } from 'axios';
// -------------------------------------------------- //

axios.defaults.withCredentials = true;

const httpClient = {
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  basePort: process.env.NEXT_PUBLIC_BASEPORT,
  get: async (endpoint: string, headers?: AxiosRequestConfig['headers']) => {
    try {
      const response = await axios.get(
        `${httpClient.baseURL}:${httpClient.basePort}/${endpoint}`,
        { headers: headers, withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting data');
      throw error;
    }
  },
  post: async (
    endpoint: string,
    body?: any,
    headers?: AxiosRequestConfig['headers']
  ) => {
    try {
      const response = await axios.post(
        `${httpClient.baseURL}:${httpClient.basePort}/${endpoint}`,
        body,
        { headers: headers, withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error('Error posting data');
      throw error;
    }
  },
};

export default httpClient;
