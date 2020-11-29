import { observable, action } from 'mobx';
import { authStructFlow, getDefaultStruct } from 'utils/struct';
import { Api } from 'types';

export class ClientStore {
  private root: { [key: string]: any };
  @observable clientInfoStruct = getDefaultStruct<Api.ClientInfo.Response>();
  @observable clientInfo: Api.ClientInfo.Response | undefined;

  constructor(stores: any) {
    this.root = stores;
  }

  @action
  fetchClientInfo = async () => {
    await authStructFlow<Api.ClientInfo.Response>(
      this.clientInfoStruct,
      {
        url: '/v1/client_info/',
      },
      {
        authStore: this.root.authStore,
      },
    );
    const { data } = this.clientInfoStruct;
    this.clientInfo = data;
  };
}
