import { observable, action } from 'mobx';
import { getDefaultStruct } from 'utils/struct';
import { Api } from 'types';

export class MetaStore {
  private root: { [key: string]: any };

  @observable productCategoriesStruct = getDefaultStruct<Api.Product.ProductCategories[]>();

  constructor(stores: any) {
    this.root = stores;
  }

  @action
  fetchProductCategories = async () => {
    await this.root.structFlow(this.productCategoriesStruct, {
      url: `/api/v0/product-categories/`,
    });

    return this.productCategoriesStruct;
  };
}
