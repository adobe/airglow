# Airglow-Prefab Plugin

An Airglow plugin that adds an Prefab middleware layer to your application.

## Usage

To enable, simply add the plugin:

```
import prefabPlugin from '@airglow/prefab-plugin';

const App = () => (
  <Airglow plugins={{
    prefabPlugin()
  }}>
    <AppContainer />
  </Airglow>
);
```
