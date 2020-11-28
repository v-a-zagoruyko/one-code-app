import React from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import * as stores from 'stores';

const RouteWithLayout = ({ component = null, layout: Layout, routeProps }: any) => (
  <Layout routeProps={routeProps}>{component && React.createElement(component, routeProps)}</Layout>
);

interface IProps extends RouteProps {
  layout: React.ElementType<any>;
  layoutProps?: { [key: string]: any };
  access: 'auth' | 'private' | 'public';
}

interface IInjectedProps extends IProps {
  authStore: stores.AuthStore;
  clientStore: stores.ClientStore;
  routeProps: RouteProps;
}

export class AppRoute extends React.Component<IProps> {
  renderPage = inject(
    'authStore',
    'clientStore',
  )(
    observer(({ authStore, clientStore, ...routeProps }: IInjectedProps) => {
      const { access = 'auth', ...topLevelPropsRest } = this.props;

      if (access === 'private' && !authStore.isLoggedIn) {
        return <Redirect to="/login" />;
      }

      if (access === 'auth' && authStore.isLoggedIn) {
        return <Redirect to="/" />;
      }

      return <RouteWithLayout routeProps={routeProps} {...topLevelPropsRest} />;
    }),
  );

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { access, component, ...rest } = this.props;
    return <Route {...rest} component={this.renderPage} />;
  }
}
