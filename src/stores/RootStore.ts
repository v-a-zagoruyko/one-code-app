import { apiClient } from 'api';
import { createStructFlow, GenericStructFlow } from 'utils/struct';
import { AuthStore } from './AuthStore';
import { ClientStore } from './ClientStore';
import { MetaStore } from './MetaStore';
import { ProductsStore } from './ProductsStore';

export class RootStore {
  stores = {};

  constructor() {
    const storesMap = {
      authStore: AuthStore,
      clientStore: ClientStore,
      metaStore: MetaStore,
      productsStore: ProductsStore,
    };

    Object.entries(storesMap).forEach(([name, Target]) => {
      const instance = new Target(this);
      (this as any)[name] = instance;
      (this.stores as any)[name] = instance;
    });
  }

  structFlow: GenericStructFlow = createStructFlow(apiClient);
}
