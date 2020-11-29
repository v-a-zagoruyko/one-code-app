import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames/bind';
import * as stores from 'stores';
import { ProductCard } from 'components';
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

  render() {
    const { productsStore } = this.props;
    const { data } = productsStore.productsStruct;

    return (
      <div className={cn('grid')}>
        {data && data.map((product, idx) => <ProductCard key={idx} product={product} />)}
      </div>
    );
  }
}
