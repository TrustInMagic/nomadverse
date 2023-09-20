import axios, { AxiosRequestConfig } from 'axios';
// -------------------------------------------------- //

axios.defaults.withCredentials = true;

const httpClient = {
  fullApiUrl: process.env.NEXT_PUBLIC_API_URL,
  get: async (endpoint: string, headers?: AxiosRequestConfig['headers']) => {
    try {
      const response = await axios.get(
        `${httpClient.fullApiUrl}/${endpoint}`,
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
        `${httpClient.fullApiUrl}/${endpoint}`,
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
