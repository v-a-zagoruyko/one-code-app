import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps {
  onClick?: () => void;
  children: React.ReactNode;
  url?: string;
  type: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  isDisabled?: boolean;
}

export const Btn = (props: IProps) => {
  const size = props.size || 'sm';
  const { onClick, children, type, url, isDisabled } = props;

  if (url) {
    return (
      <Link className={cx('btn', `btn--${type}`, `btn--${size}`)} to={url}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cx('btn', `btn--${type}`, `btn--${size}`)}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
