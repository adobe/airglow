# Airglow Test Plugin

An Airglow plugin that adds a reducer that tracks all calls that are dispatched throught Airglow.

## Usage

Simply enable it:

```js
import testPlugin from '@airglow/plugin-test';

const App = () => (
  <Airglow plugins={{
    testPlugin()
  }}>
    <AppContainer />
  </Airglow>
);
```

You can access data using `lastDispatch` and `dispatchList`:

```js
import React from 'react';
import { renderAirglow } from 'airglow';
import ReactStore from '@airglow/store-react';
import plugin, { lastDispatch, dispatchList } from '@airglow/plugin-test';

describe('MyTest', () => {
  beforeEach(() => {
    tree = renderAirglow(
      <div />,
      {
        plugins: [plugin()],
        store: ReactStore
      }
    );
    tree.dispatch({ type: 'testEvent' });
    tree.dispatch({ type: 'another' });
  });
  it('should keep track of all the dispatches', function () {
    expect(dispatchList(tree.getState())).toMatchSnapshot();
  });
  it('should correctly get the last event', function () {
    expect(lastDispatch(tree.getState())).toMatchSnapshot();
  });
});
```

That's it!
