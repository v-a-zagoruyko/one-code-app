import React from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps {
  children?: React.ReactNode;
}

export const Main = ({ children }: IProps) => {
  return (
    <div className={cx('container')}>
      <h1>Hello world!</h1>
    </div>
  );
};
