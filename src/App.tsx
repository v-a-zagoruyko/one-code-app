import React, { Suspense } from 'react';
import { Provider } from 'mobx-react';
import { RootStore } from 'stores';
import { Router } from './Router';

// import './styles/global.scss';

const rootStore = new RootStore() as any;

class App extends React.Component {
  componentDidCatch(e: Error) {
    console.error(e);
  }

  render() {
    return (
      <Provider {...rootStore.stores}>
        <Suspense fallback={<div />}>
          <Router />
        </Suspense>
      </Provider>
    );
  }
}

export default App;
