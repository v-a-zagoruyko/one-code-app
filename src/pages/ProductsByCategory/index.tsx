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
  metaStore: stores.MetaStore;
}

@inject('productsStore', 'metaStore')
@observer
export class ProductsByCategory extends React.Component<IProps> {
  async componentDidMount() {
    const { metaStore, productsStore, match, history } = this.props;
    const { id, slug } = match.params;

    await metaStore.fetchProductCategory(id);
    const { data } = metaStore.productCategoryStruct;
    if (data && data.slug !== slug) {
      history.push(`/shopping/${id}-${data.slug}`);
    }

    productsStore.fetchProductsByCategories(id);
  }

  async componentDidUpdate(prevProps: IProps) {
    const { metaStore, productsStore, match, history } = this.props;
    const { id, slug } = match.params;

    if (prevProps.match.params.id !== id) {
      await metaStore.fetchProductCategory(id);
      const { data } = metaStore.productCategoryStruct;
      if (data && data.slug !== slug) {
        history.push(`/shopping/${id}-${data.slug}`);
      }

      productsStore.fetchProductsByCategories(id);
    }
  }

  get renderInfo() {
    const { data: category, isFetching } = this.props.metaStore.productCategoryStruct;

    if (isFetching) {
      return (
        <div className={cx('category-info')}>
          <h1 className={cx('category-info__title')}>
            <LoadingSkeleton type="title" />
          </h1>
          <p className={cx('category-info__description')}>
            <LoadingSkeleton type="paragraph" />
          </p>
        </div>
      );
    }

    return (
      <div className={cx('category-info')}>
        <h1 className={cx('category-info__title')}>{category?.title}</h1>
        {category?.description && (
          <p className={cx('category-info__description')}>{category?.description}</p>
        )}
      </div>
    );
  }

  get renderProducts() {
    const { data: products, isFetching } = this.props.productsStore.productsStruct;

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
        {this.renderInfo}
        {this.renderProducts}
      </>
    );
  }
}
