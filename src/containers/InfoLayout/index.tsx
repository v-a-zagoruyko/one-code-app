import React from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';
import { Header } from '../HomeLayout/Header';
import { Footer } from '../HomeLayout/Footer';

const cx = cn.bind(styles);

interface IProps {
  children?: React.ReactNode;
}

export const InfoLayout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
      <Footer />
    </>
  );
};
