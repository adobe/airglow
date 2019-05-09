# Airglow Saga Plugin

An Airglow plugin that adds [Redux Saga](https://redux-saga.js.org/) middleware layer to your application.

## Usage

To enable, simply add the plugin:

```
import sagaPlugin from '@airglow/plugin-saga';

const App = () => (
  <Airglow plugins={{
    sagaPlugin({ locales })
  }}>
    <AppContainer />
  </Airglow>
);
```

## Adding Sagas

When Bootstraping a UI or initilizting your app, you can add new sagas:

```
import sagas from './sagas';

const Wrapper = props => (
  <AirglowWrapper
    config={{
      name: 'sample',
      sagas
    }}
  >
    <UIContainer {...props} />
  </AirglowWrapper>
);
```

## Saga Plugin Feature

By adding the Saga Plugin, you enable a new plugin feature. Other plugins may now use the `SAGA` plugin hook to register their own sagas:

```
import { SAGA } from '@airglow/plugin-saga';
import { sagas } from 'custom-airglow-plugin';

export default function plugin() {
  return (engine) => {
    ...
    engine.plugin(SAGA, sagas);
  };
}
```

Here we are registering our custom plugin's sagas so they can respond to Redux dispatches.
