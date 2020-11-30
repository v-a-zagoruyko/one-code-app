import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import { LoadingSkeleton } from 'components';
import * as stores from 'stores';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps {}

interface IInjectedProps extends IProps {
  metaStore: stores.MetaStore;
}

@inject('metaStore')
@observer
export class Header extends React.Component<IProps> {
  injected = this.props as IInjectedProps;

  componentDidMount() {
    this.injected.metaStore.fetchProductCategories();
  }

  get renderNav() {
    const { data, isFetching } = this.injected.metaStore.productCategoriesStruct;

    if (isFetching || !data) {
      return (
        <div className={cx('nav')}>
          <LoadingSkeleton type="title" />
          <LoadingSkeleton type="title" />
          <LoadingSkeleton type="title" />
          <LoadingSkeleton type="title" />
        </div>
      );
    }

    return (
      <nav className={cx('nav')}>
        {data?.map(({ id, title, slug }) => (
          <Link key={id} className={cx('nav__link')} to={`/shopping/${id}-${slug}`}>
            {title}
          </Link>
        ))}
      </nav>
    );
  }

  render() {
    return (
      <header className={cx('header')}>
        <div className={cx('brand')}>
          <Link className={cx('brand__logo')} to="/">
            1Code
          </Link>
          <div className={cx('brand__user')}>
            <Link className={cx('brand__link', 'mobile-hide')} to="/">
              Личный кабинет
            </Link>
            <Link className={cx('brand__link')} to="/">
              Вишлист
            </Link>
            <Link className={cx('brand__link')} to="/">
              Корзина
            </Link>
          </div>
        </div>
        {this.renderNav}
        {/* <div className={cx('events')}></div> */}
      </header>
    );
  }
}
