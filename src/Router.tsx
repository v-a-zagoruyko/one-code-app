import React from 'react';
import { Router as ReactRouter, Switch, Route } from 'react-router-dom';
import { Main, Default } from 'pages';
import { AuthLayout, HomeLayout, AppRoute } from 'containers';
import { history } from 'utils/history';

export const Router = () => (
  <ReactRouter history={history}>
    <Switch>
      <AppRoute path="/" exact layout={HomeLayout} component={Main} access="public" />
      <AppRoute path="/login" exact layout={AuthLayout} component={Main} access="private" />
      <Route component={Default} />
    </Switch>
  </ReactRouter>
);
