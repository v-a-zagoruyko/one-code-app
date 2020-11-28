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
          <h6>Подпишитесь на @MAG_NAME</h6>
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
          <h6>О @MAG_NAME</h6>
          <Link to="/info/about">О нас</Link>
          <Link to="/info/locations">Адреса магазинов</Link>
          <Link to="/sitemap">Карта сайта</Link>
        </div>
      </div>
      <div className={cx('footer__disclaimer')}>
        <span>
          Официальный сайт @MAG_NAME. '@MAG_NAME' и логотип '@MAG_NAME' являются торговыми марками
          @MAG_NAME UK Limited и зарегистрированы в многочисленных юрисдикционных системах по всему
          миру.
        </span>
        <span>© Copyright 2020 @MAG_NAME UK Limited. Все права защищены.</span>
      </div>
    </footer>
  );
};
