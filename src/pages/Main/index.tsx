import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';
import cn from 'classnames/bind';
import * as stores from 'stores';
import styles from './index.module.scss';

const cx = cn.bind(styles);

interface IProps extends RouteComponentProps {}

interface IInjectedProps extends IProps {
  productsStore: stores.ProductsStore;
}

@inject('productsStore')
@observer
export class Main extends React.Component<IProps> {
  injected = this.props as IInjectedProps;

  componentDidMount() {}

  render() {
    return (
      <>
        <h1 className={cn('info-header')}>Главная</h1>
      </>
    );
  }
}
