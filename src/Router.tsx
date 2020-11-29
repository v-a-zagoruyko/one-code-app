import { Router as ReactRouter, Switch, Route } from 'react-router-dom';
import {
  Main,
  About,
  Default,
  PrivacyPolicy,
  TermsAndConditions,
  ProductsByCategory,
  Product,
} from 'pages';
import { AuthLayout, HomeLayout, InfoLayout, AppRoute } from 'containers';
import { history } from 'utils/history';

export const Router = () => (
  <ReactRouter history={history}>
    <Switch>
      <AppRoute path="/" exact layout={HomeLayout} component={Main} access="public" />
      <AppRoute
        path="/shopping/:id-:slug"
        exact
        layout={HomeLayout}
        component={ProductsByCategory}
        access="public"
      />
      <AppRoute
        path="/clothing/:id-:slug"
        exact
        layout={HomeLayout}
        component={Product}
        access="public"
      />

      <AppRoute
        path="/customer/terms-and-conditions"
        exact
        layout={InfoLayout}
        component={TermsAndConditions}
        access="public"
      />
      <AppRoute
        path="/customer/privacy-policy"
        exact
        layout={InfoLayout}
        component={PrivacyPolicy}
        access="public"
      />

      <AppRoute path="/info/about" exact layout={InfoLayout} component={About} access="public" />

      <AppRoute path="/login" exact layout={AuthLayout} component={Main} access="private" />

      <Route component={Default} />
    </Switch>
  </ReactRouter>
);
