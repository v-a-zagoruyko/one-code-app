import React from 'react';
import cn from 'classnames/bind';
import styles from './index.module.scss';

const cx = cn.bind(styles);

export const Default = () => {
  return (
    <>
      <h1 className={cn('info-header')}>404</h1>
    </>
  );
};
