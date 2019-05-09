# Corona-Saga Plugin

A [Corona](https://git.corp.adobe.com/dms-mobile/dipper/packages/corona) plugin that adds [Redux Saga](https://redux-saga.js.org/) middleware layer to your application.

## Usage

To enable, simply add the plugin:

```
import sagaPlugin from '@nebula/corona-saga-plugin';

const App = () => (
  <Corona plugins={{
    sagaPlugin({ locales })
  }}>
    <AppContainer />
  </Corona>
);
```

## Adding Sagas

Your MicroUIs can add new sagas on bootstrap:

```
import sagas from './sagas';

const Wrapper = props => (
  <BootstrapWrapper
    config={{
      name: 'sample',
      sagas
    }}
  >
    <UIContainer {...props} />
  </BootstrapWrapper>
);
```

## Saga Plugin Feature

By adding the Saga Plugin, you enable a new plugin feature. Other plugins may now use the `SAGA` plugin hook to register their own sagas. For example, the [Corona-Izzy Plugin](https://git.corp.adobe.com/dms-mobile/dipper/packages/corona-izzy-plugin) has the following setup:

```
import { SAGA } from '@nebula/corona-saga-plugin';
import { sagas } from '@nebula/izzy';

export default function izzyPlugin() {
  return (engine) => {
    ...
    engine.plugin(SAGA, sagas);
  };
}
```

Here we are registering Izzy's custom sagas that load external localization files with our saga middleware.
