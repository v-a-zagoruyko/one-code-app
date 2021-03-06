import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames/bind';
import { Btn, Icon, LoadingSkeleton } from 'components';
import * as stores from 'stores';
import styles from './index.module.scss';

const cx = cn.bind(styles);

type TRouteParams = {
  id: string;
  slug: string;
};

interface IProps extends RouteComponentProps<TRouteParams> {
  productsStore: stores.ProductsStore;
  clientStore: stores.ClientStore;
}

interface IState {
  isFavourite: boolean;
}

@inject('productsStore', 'clientStore')
@observer
export class Product extends React.Component<IProps, IState> {
  state = {
    isFavourite: false,
  };

  componentDidMount() {
    const { isProductInFavourites } = this.props.clientStore;
    const { id } = this.props.match.params;
    this.props.productsStore.fetchProduct(id);

    const isFavourite = isProductInFavourites(id);
    this.setState({ isFavourite });
  }

  handleToggleFavourites = (id: number | string) => {
    const { toggleFavourites } = this.props.clientStore;
    const isFavourite = toggleFavourites(id);
    this.setState({ isFavourite });
  };

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

    const { isFavourite } = this.state;
    const { id, title, description, isAvailable, price, salePrice } = product;

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
        <div className={cn('btn-group')}>
          <Btn type="primary" isDisabled={!isAvailable}>
            <Icon icon="cart-add" />
            Добавить в корзину
          </Btn>
          <Btn
            onClick={() => this.handleToggleFavourites(id)}
            type={isFavourite ? 'primary' : 'secondary'}
          >
            <Icon icon="favourite" />
          </Btn>
        </div>
      </div>
    );
  }

  get renderInfo() {
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
