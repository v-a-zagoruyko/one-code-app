import { AuthStore } from './AuthStore';
import { ClientStore } from './ClientStore';

export class RootStore {
  stores = {};

  constructor() {
    const storesMap = {
      authStore: AuthStore,
      clientStore: ClientStore,
    };

    // create instances for all stores and bind them to RootStore instance
    Object.entries(storesMap).forEach(([name, Target]) => {
      const instance = new Target(this);
      (this as any)[name] = instance;
      (this.stores as any)[name] = instance;
    });
  }
}
