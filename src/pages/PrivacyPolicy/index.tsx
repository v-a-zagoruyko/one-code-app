import React from 'react';
import cn from 'classnames';
import { text } from 'assets/walloftext';

export const PrivacyPolicy = () => {
  return (
    <>
      <h1 className={cn('info-header')}>Политика конфиденциальности</h1>
      <div className={cn('info-html')} dangerouslySetInnerHTML={{ __html: text.privacyPolicy }} />
    </>
  );
};
