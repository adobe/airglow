# Airglow-DevTools Plugin

An plugin that adds the [Redux DevTools UI](https://github.com/gaearon/redux-devtools) to your application.

## Usage

Simply add the plugin when you are setting up your Airglow instance:

```
import devtoolPlugin from '@airglow/plugin-devtools';

const App = () => (
  <Airglow plugins={{
    devtoolPlugin({ reduxBrowser: true })
  }}>
    <AppContainer />
  </Airglow>
);
```

## Options

By default, no tools are enabled. You'll have to pass in which tools you want.

### reduxDevtools
Enables reduxDevtools in the page. This will add a new component into your DOM.
__Note__, this option is not recomended with Inferno since it conflicts with infernos devtool implementation at the momment.

### reduxBrowser
Enables the [browser devtools plugin](https://github.com/zalmoxisus/redux-devtools-extension) for redux.

