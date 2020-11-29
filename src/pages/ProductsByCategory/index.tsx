import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames/bind';
import * as stores from 'stores';
import { LoadingSkeleton, ProductCard } from 'components';
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
export class ProductsByCategory extends React.Component<IProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.productsStore.fetchProductsByCategories(id);
  }

  componentDidUpdate(prevProps: IProps) {
    const { id } = this.props.match.params;

    if (prevProps.match.params.id !== id) {
      this.props.productsStore.fetchProductsByCategories(id);
    }
  }

  render() {
    const { data, isFetching } = this.props.productsStore.productsStruct;

    if (isFetching || !data) {
      return (
        <div className={cx('grid')}>
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
          <LoadingSkeleton type="image" />
        </div>
      );
    }

    return (
      <div className={cn('grid')}>
        {data?.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    );
  }
}
