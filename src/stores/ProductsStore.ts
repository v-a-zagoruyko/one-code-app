import { observable, action } from 'mobx';
import { getDefaultStruct } from 'utils/struct';
import { Api } from 'types';

export class ProductsStore {
  private root: { [key: string]: any };

  @observable productStruct = getDefaultStruct<Api.Product.Item>();
  @observable productsStruct = getDefaultStruct<Api.Product.Item[]>();

  constructor(stores: any) {
    this.root = stores;
  }

  @action.bound
  fetchProduct = async (id: string) => {
    await this.root.structFlow(this.productStruct, {
      url: `/api/v0/product/${id}/`,
    });

    return this.productStruct;
  };

  @action.bound
  fetchProductsByCategories = async (id: string) => {
    await this.root.structFlow(this.productsStruct, {
      // url: `/api/v0/products-by-category/${id}/`,
      url: `/api/v0/products-by-category/`,
    });

    return this.productsStruct;
  };
}
