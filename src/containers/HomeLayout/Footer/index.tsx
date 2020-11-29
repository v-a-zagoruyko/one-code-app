import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames/bind';
import styles from './index.module.scss';

const cx = cn.bind(styles);

export const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('footer__container')}>
        <div className={cx('footer__col')}>
          <h6>Способы оплаты</h6>
        </div>
        <div className={cx('footer__col')}>
          <h6>Подпишитесь на 1Code</h6>
        </div>
        <div className={cx('footer__col')}>
          <h6>Для клиентов</h6>
          <Link to="/customer/help-and-contacts">Помощь и контакты</Link>
          <Link to="/customer/how-to">Как совершить покупку</Link>
          <Link to="/customer/orders-and-delivery">Заказы и доставка</Link>
          <Link to="/customer/refunds">Возврат товара</Link>
          <Link to="/customer/answers-and-questions">Вопросы и ответы</Link>
          <Link to="/customer/collect">Самовывоз</Link>
          <Link to="/customer/privacy-policy">Политика конфиденциальности</Link>
          <Link to="/customer/terms-and-conditions">Условия пользования</Link>
        </div>
        <div className={cx('footer__col')}>
          <h6>О 1Code</h6>
          <Link to="/info/about">О нас</Link>
          <Link to="/info/locations">Адреса магазинов</Link>
          <Link to="/sitemap">Карта сайта</Link>
        </div>
      </div>
      <div className={cx('footer__disclaimer')}>
        <span>
          Официальный сайт 1Code. '1Code' и логотип '1Code' являются торговыми марками 1Code UK
          Limited и зарегистрированы в многочисленных юрисдикционных системах по всему миру.
        </span>
        <span>© Copyright 2020 1Code UK Limited. Все права защищены.</span>
      </div>
    </footer>
  );
};
