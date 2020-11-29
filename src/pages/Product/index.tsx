import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames/bind';
import * as stores from 'stores';
import styles from './index.module.scss';

const cx = cn.bind(styles);

type TRouteParams = {
  id: string;
  slug: string;
};

interface IProps extends RouteComponentProps<TRouteParams> {
  productsStore: stores.ProductsStore;
}

@inject('productsStore')
@observer
export class Product extends React.Component<IProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.productsStore.fetchProduct(id);
  }

  get renderPhotos() {
    const { productsStore } = this.props;
    const { data: product } = productsStore.productStruct;

    return (
      <div className={cx('product-photos')}>
        {product?.photos.map((src, idx) => (
          <img key={idx} src={src} alt={`${product?.title} ${product?.description || ''}`} />
        ))}
      </div>
    );
  }

  render() {
    const { productsStore } = this.props;
    const { data: product } = productsStore.productStruct;

    return (
      <>
        <div className={cx('product-container')}>
          {this.renderPhotos}
          <div className={cx('product-action')}></div>
        </div>
        <div className={cx('product-info')}></div>
      </>
    );
  }
}
