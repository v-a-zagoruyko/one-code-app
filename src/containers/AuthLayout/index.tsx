import React from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps {
  children?: React.ReactNode;
}

export const AuthLayout = ({ children }: IProps) => {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>{children}</div>
      <footer className={cx('footer')}></footer>
    </div>
  );
};
