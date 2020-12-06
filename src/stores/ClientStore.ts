import { observable, action, autorun, makeObservable } from 'mobx';
import { authStructFlow, getDefaultStruct } from 'utils/struct';
import { Api } from 'types';

export class ClientStore {
  private root: { [key: string]: any };
  @observable clientInfoStruct = getDefaultStruct<Api.ClientInfo.Response>();
  @observable clientInfo: Api.ClientInfo.Response | undefined;

  @observable favouriteProductsId = observable<number>([]);

  constructor(stores: any) {
    this.root = stores;
    makeObservable(this);
    this.initRehydration();
  }

  initRehydration = () => {
    if (localStorage.getItem('favouriteProductsId')) {
      this.favouriteProductsId = JSON.parse(localStorage.getItem('favouriteProductsId')!);
    }

    autorun(() => {
      localStorage.setItem('favouriteProductsId', JSON.stringify(this.favouriteProductsId));
    });
  };

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

  @action
  toggleFavourites = async (id: number | string) => {
    const productId = Number(id);
    if (this.favouriteProductsId.includes(productId)) {
      this.favouriteProductsId.remove(productId);
    } else {
      this.favouriteProductsId.push(productId);
    }
  };
}
