import { observable, action, makeObservable } from 'mobx';
import qs from 'qs';
import { getDefaultStruct } from 'utils/struct';
import { Api } from 'types';

export class ProductsStore {
  private root: { [key: string]: any };

  @observable productStruct = getDefaultStruct<Api.Product.Item>();
  @observable productsStruct = getDefaultStruct<Api.Product.Item[]>();
  @observable favouritesStruct = getDefaultStruct<Api.Product.Item[]>();

  constructor(stores: any) {
    this.root = stores;
    makeObservable(this);
  }

  @action
  fetchProduct = async (id: string) => {
    await this.root.structFlow(this.productStruct, {
      url: `/api/v0/product/${id}/`,
    });

    return this.productStruct;
  };

  @action
  fetchProductsByCategories = async (id: string) => {
    await this.root.structFlow(this.productsStruct, {
      url: `/api/v0/products-by-category/`,
      params: { category_id: id },
    });

    return this.productsStruct;
  };

  @action
  fetchFavourites = async (ids: number[] | string[]) => {
    await this.root.structFlow(this.favouritesStruct, {
      url: `/api/v0/products-favourites/`,
      params: { id_list: ids },
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: 'brackets' });
      },
    });

    return this.favouritesStruct;
  };
}
