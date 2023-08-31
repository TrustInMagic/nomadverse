import axios, { AxiosRequestConfig } from 'axios';
// -------------------------------------------------- //

const httpClient = {
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
  basePort: process.env.NEXT_PUBLIC_BASEPORT,
  get: async (endpoint: string, headers?: AxiosRequestConfig['headers']) => {
    try {
      const response = await axios.get(
        `${httpClient.baseURL}:${httpClient.basePort}/${endpoint}`,
        { headers: headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error getting data');
      throw error;
    }
  },
  post: async (
    endpoint: string,
    body?: string | Array<any>,
    headers?: AxiosRequestConfig['headers']
  ) => {
    try {
      const response = await axios.post(
        `${httpClient.baseURL}:${httpClient.basePort}/${endpoint}`,
        body,
        { headers: headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error posting data');
      throw error;
    }
  },
};

export default httpClient;
