import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import qs from 'qs';
import NetworkError from 'api/networkError';
import * as _ from 'utils/lodash';
import { env } from 'utils/env';

const responseTransformers = [
  ...(axios.defaults.transformResponse as any),
  (data: any) => camelizeKeys(data),
];

const requestTransformers = [
  (data: any) => decamelizeKeys(data),
  ...(axios.defaults.transformRequest as any),
];

const createClient = (opts: AxiosRequestConfig): AxiosInstance => {
  const client = axios.create({
    transformResponse: responseTransformers,
    paramsSerializer: (params: any) =>
      qs.stringify(decamelizeKeys(params), { arrayFormat: 'comma' }),
    ...opts,
  });

  client.interceptors.response.use(
    (x) => x,
    (error) => {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }
      if (!error.response) {
        const typedError = error.isAxiosError ? new Error(error) : error;
        return Promise.reject(typedError);
      }
      const convertedError = new NetworkError(error.response || {});
      return Promise.reject(convertedError);
    },
  );

  return client;
};

const mergeAxiosOpts = ({
  transformRequest = _.identity,
  transformResponse = _.identity,
  params = {},
  baseURL = env.REACT_APP_API_BASE_URL,
  ...opts
}: any = {}): AxiosRequestConfig => ({
  transformRequest: [transformRequest, ...requestTransformers],
  transformResponse: [...responseTransformers, transformResponse],
  params: decamelizeKeys(params),
  baseURL,
  headers: {
    'Accept-Language': 'ru',
    ...opts.headers,
  },
  ...opts,
});

export const apiClient = createClient(mergeAxiosOpts({}));

export default apiClient;
