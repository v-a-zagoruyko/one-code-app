import React from 'react';
import { inject, observer } from 'mobx-react';
import cn from 'classnames/bind';
import * as stores from 'stores';
import { LoadingSkeleton, ProductCard } from 'components';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps {
  productsStore: stores.ProductsStore;
  clientStore: stores.ClientStore;
}

@inject('productsStore', 'clientStore')
@observer
export class Favourites extends React.Component<IProps> {
  async componentDidMount() {
    const {
      clientStore: { favouriteProductsId },
      productsStore,
    } = this.props;

    if (favouriteProductsId) {
      productsStore.fetchFavourites(favouriteProductsId);
    }
  }

  get renderProducts() {
    const { data: products, isFetching } = this.props.productsStore.favouritesStruct;

    if (isFetching) {
      return (
        <div className={cx('grid')}>
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
        </div>
      );
    }

    return (
      <div className={cn('grid')}>
        {products?.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    );
  }

  render() {
    return (
      <>
        <div className={cx('favourites')}>
          <h1 className={cx('favourites__title')}>Вишлист</h1>
        </div>
        {this.renderProducts}
      </>
    );
  }
}
