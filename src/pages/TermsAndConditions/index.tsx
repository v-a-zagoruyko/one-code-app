import React from 'react';
import cn from 'classnames';
import { text } from 'assets/walloftext';

export const TermsAndConditions = () => {
  return (
    <>
      <h1 className={cn('info-header')}>Условия пользования</h1>
      <div
        className={cn('info-html')}
        dangerouslySetInnerHTML={{ __html: text.termsAndConditions }}
      />
    </>
  );
};
