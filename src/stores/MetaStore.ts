import { observable, action, makeObservable } from 'mobx';
import { getDefaultStruct } from 'utils/struct';
import { Api } from 'types';

export class MetaStore {
  private root: { [key: string]: any };

  @observable productCategoryStruct = getDefaultStruct<Api.Product.ProductCategory>();
  @observable productCategoriesStruct = getDefaultStruct<Api.Product.ProductCategory[]>();

  constructor(stores: any) {
    this.root = stores;
    makeObservable(this);
  }

  @action
  fetchProductCategory = async (id: number | string) => {
    await this.root.structFlow(this.productCategoryStruct, {
      url: `/api/v0/product-categories/${id}/`,
    });

    return this.productCategoryStruct;
  };

  @action
  fetchProductCategories = async () => {
    await this.root.structFlow(this.productCategoriesStruct, {
      url: `/api/v0/product-categories/`,
    });

    return this.productCategoriesStruct;
  };
}
