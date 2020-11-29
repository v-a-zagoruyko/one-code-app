import React from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';
import { Header } from './Header';
import { Footer } from './Footer';

const cx = cn.bind(styles);

interface IProps {
  children?: React.ReactNode;
}

export const HomeLayout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <div className={cx('container')}>{children}</div>
      <Footer />
    </>
  );
};
