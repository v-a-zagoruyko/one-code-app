import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames/bind';
import { LoadingSkeleton } from 'components';
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
    const { data: product, isFetching } = this.props.productsStore.productStruct;

    if (isFetching) {
      return (
        <div className={cx('product-photos')}>
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
        </div>
      );
    }

    return (
      <div className={cx('product-photos')}>
        {product?.photos.map((src, idx) => (
          <img key={idx} src={src} alt={`${product?.title} ${product?.description || ''}`} />
        ))}
      </div>
    );
  }

  get renderAction() {
    const { data: product, isFetching } = this.props.productsStore.productStruct;

    if (isFetching || !product) {
      return (
        <div className={cx('product-action')}>
          <LoadingSkeleton type="title" />
          <LoadingSkeleton type="paragraph" />
        </div>
      );
    }

    const { title, description, price, salePrice } = product;

    return (
      <div className={cx('product-action')}>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        {(!salePrice || salePrice === 0) && <span>{price} ₽</span>}
        {(salePrice || salePrice !== 0) && (
          <span>
            <s>{price} ₽</s>
            {salePrice} ₽
          </span>
        )}
      </div>
    );
  }

  render() {
    return (
      <>
        <div className={cx('product-container')}>
          {this.renderPhotos}
          {this.renderAction}
        </div>
        <div className={cx('product-info')}></div>
      </>
    );
  }
}
