import { AxiosRequestConfig } from 'axios';
import { action } from 'mobx';
import * as _ from 'utils/lodash';
import apiCall from 'api';

export interface Struct<T, E> {
  data?: T;
  isFetching: boolean;
  errors?: E;
}

export interface StructFlowOpts<T> {
  transformResponse?(d: T): T;
}

interface AuthStructFlowOpts<T> extends StructFlowOpts<T> {
  authStore?: any;
}

export interface GenericStructFlow {
  <T>(s: Struct<T, any>, c: AxiosRequestConfig, o: StructFlowOpts<T>): Promise<any>;
}

const defaultOpts = {
  transformResponse: (d: any) => d,
};

export const getDefaultStruct = <T>(): Struct<T, any> => ({
  data: undefined,
  isFetching: false,
  errors: undefined,
});

export const createStructFlow = (request: any = apiCall) => <T>(
  struct: Struct<T, any>,
  axiosParams: AxiosRequestConfig,
  opts: StructFlowOpts<T> = defaultOpts,
): Promise<any> => {
  const runAction = action(async () => {
    struct.data = undefined;
    struct.isFetching = true;
    struct.errors = undefined;
    try {
      const { data } = await request(axiosParams);
      const { transformResponse } = opts;
      const preparedData = transformResponse ? transformResponse(data) : data;
      struct.data = (preparedData as T) || ({} as T);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      struct.errors = error;
    } finally {
      struct.isFetching = false;
    }
  });
  return runAction();
};

export const structFlow = createStructFlow();

export async function authStructFlow<T>(
  struct: Struct<T, any>,
  axiosParams: AxiosRequestConfig,
  opts: AuthStructFlowOpts<T> = defaultOpts,
): Promise<any> {
  // TODO: skip request and log it when user is logged out
  await structFlow<T>(
    struct,
    {
      ...axiosParams,
      withCredentials: true,
    },
    opts,
  );

  if (opts.authStore && _.get(struct.errors, 'status') === 401) {
    opts.authStore.isLoggedIn = false;
  }
}
