import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import { makeProductUrl } from 'utils/urls';
import { Api } from 'types';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps {
  product: Api.Product.Item;
}

export const ProductCard = ({ product }: IProps) => {
  const { id, slug, title, description, price, sizes, photos } = product;
  const sizes_string = sizes.map((x) => x.size).join(' ');
  const url = makeProductUrl(id, slug);

  return (
    <Link className={cx('card')} to={url}>
      {photos.length > 1 && (
        <img
          className={cx('card__img', 'card__img--next')}
          src={photos[1]}
          alt={`${title} ${description}`}
        />
      )}
      <img className={cx('card__img')} src={photos[0]} alt={`${title} ${description || ''}`} />
      <div className={cx('card__body')}>
        <h6 className={cx('card__title')}>{title}</h6>
        {description && <p className={cx('card__description')}>{description}</p>}
        <span className={cx('card__sizes')}>{sizes_string}</span>
        <span className={cx('card__price')}>
          {price} <span>₽</span>
        </span>
      </div>
    </Link>
  );
};
