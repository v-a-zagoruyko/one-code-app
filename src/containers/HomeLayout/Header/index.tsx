import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './index.module.scss';

const cx = cn.bind(styles);

export const Header = () => {
  return (
    <header className={cx('header')}>
      <div className={cx('brand')}>
        <Link className={cx('brand__logo')} to="/">
          @MAG_NAME
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
      <nav className={cx('nav')}>
        <Link className={cx('nav__link')} to="/">
          Футболки
        </Link>
        <Link className={cx('nav__link')} to="/">
          Худи
        </Link>
      </nav>
      {/* <div className={cx('events')}></div> */}
    </header>
  );
};
