import React from 'react';
import cn from 'classnames';
import { text } from 'assets/walloftext';

export const About = () => {
  return (
    <>
      <h1 className={cn('info-header')}>О @MAG_NAME</h1>
      <div className={cn('info-html')} dangerouslySetInnerHTML={{ __html: text.about }} />
    </>
  );
};
