import { observable, action, autorun, makeObservable } from 'mobx';
import { authStructFlow, getDefaultStruct } from 'utils/struct';

export class AuthStore {
  private root: { [key: string]: any };
  @observable isLoggedIn = false;
  @observable logoutStruct = getDefaultStruct<any>();

  constructor(stores: any) {
    this.root = stores;
    this.initRehydration();
    makeObservable(this);
  }

  initRehydration = () => {
    this.isLoggedIn = Boolean(localStorage.getItem('isLoggedIn'));
    autorun(() => {
      if (this.isLoggedIn) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.removeItem('isLoggedIn');
      }
    });
  };

  @action
  logout = async () => {
    await authStructFlow<any>(this.logoutStruct, {
      url: '/v1/logout/',
      method: 'POST',
    });

    if (this.logoutStruct.data) {
      this.root.clientStore.resetUser();
      this.isLoggedIn = false;
    }
  };
}
