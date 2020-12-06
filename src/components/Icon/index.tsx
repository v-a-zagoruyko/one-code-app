import React from 'react';
import { ReactSVG } from 'react-svg';
import cn from 'classnames/bind';
import styles from './index.module.scss';

import favourite from 'assets/icons/favourite.svg';
import cart from 'assets/icons/cart.svg';
import cartAdd from 'assets/icons/cart-add.svg';

const cx = cn.bind(styles);

interface IProps {
  icon: 'favourite' | 'cart' | 'cart-add';
  size?: '16' | '18';
}

export const Icon = (props: IProps) => {
  let src = '';
  const { icon, size } = props;
  const iconSize = size || '16';

  switch (icon) {
    case 'favourite':
      src = favourite;
      break;
    case 'cart':
      src = cart;
      break;
    case 'cart-add':
      src = cartAdd;
      break;
    default:
      src = '';
  }

  return <ReactSVG className={cx('icon', `icon--size-${iconSize}`)} src={src} />;
};
