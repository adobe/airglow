# Prefab

A framework for writing reusable reducers and selectors in a [Redux](redux.js.org) application.

## Introduction

In a [Redux](redux.js.org) applications, we hold the entire application state in a single _store_. We extract data from the _store_ using __selectors__. We add new data into the store using __reducers__. Prefab is a framework allowing you to create __selectors__ and __reducers__ that your components can reuse.

For example, let's say we have a map component:

![Sample Map](https://git.corp.adobe.com/dms-mobile/dipper/blob/master/docs/assets/sample.map.png?raw=true)

Every time our map component is used, there are certain things we know we'll have to hook up. We need to know the current coordinates of the map. We need to handle zooming in and out. We need to know whether to show a street map or satelite map. Using __Prefab__, we can consolidate all of the common map logic into a __Prefab Construct__.

## Initializing Prefab

### With Airglow

Initializing __Prefab__ in Airglow is simple:

```
import Airglow, { BootstrapWrapper } from '@airglow/core';
import prefabPlugin from '@airglow/prefab-plugin';

export const App = () => (
  <Airglow plugins={[prefabPlugin()]}>
    <BootstrapWrapper
      config={{ prefab: prefabConfig }}>
        ...application
    </BootstrapWrapper>
  </Airglow>
);
```

### Standalone

```
import { createStore, compose } from 'redux';
import { reducer, BOOTSTRAP_PREFAB } from '@airglow/prefab';

const store = createStore(
  combineReducers({
    prefab: reducer
  })
);

store.dispatch({ type: BOOTSTRAP_PREFAB, payload: prefabConfig });
```

Reguardless, __Prefab__ will add a `prefab` section to the store where it will hold all it's information.


## Constructs

__Constructs__ are a group of rules and settings that the __Prefab Framework__ is able to use. Continuing with our map sample, look at the following construct:

```
const mapConstruct = ({
  defaultZoom = 1
}) => ({
  defaultZoom
});

const prefabConfig = {
  bigMap: mapConstruct(2),
  smallMap: mapConstruct(6)
};
```

When applying this config to __Prefab__, __Prefab__ our _Redux store_ will look like:

```
prefab: {
  bigMap: {
    construct: {
      name: 'bigMap',
      defaultZoom: 2
    },
    store: {
    }
  },
  smallMap: {
    construct: {
      name: 'smallMap',
      defaultZoom: 6
    },
    store: {
    }
  }
}
```

All of the original configuration gets stored in the _construct_ section. All changes to state will be stored in the _store_ section.

## Selectors

As you no doubt noticed, part of creating the _mapConstruct_ was defining a __selector__. This is how we are going to pull data out of the store. Let's take a look at a sample _mapSelector_:

```
const mapSelector = ({ state }) => ({
  zoom: state.store.zoom || state.construct.defaultZoom
});
```

This is a really basic __selector__. We are passing in the current zoom value from the store. If there isn't one, we are passing in the defaultZoom.

## Event Handling

Next, it's likely we'll want to handle events in our __Ubra Construct__ as well:

```
const mapSelector = ({ state, dispatch }) => ({
  zoom: state.store.zoom || state.construct.defaultZoom,
  onZoomIn: dispatch({ type: ZOOM_IN }),
  onZoomOut: dispatch({ type: ZOOM_OUT })
});
```

## Reducers

We'll want to automatically handle those _zoom_ events:

```
const reduce = (state, action) => {
  const zoom = state.store.zoom || state.construct.defaultZoom;
  if (action.type === ZOOM_IN) {
    return { ...state, store: { ...store, zoom: zoom + 1 } };
  }
  if (action.type === ZOOM_OUT) {
    return { ...state, store: { ...store, zoom: zoom + 1 } };
  }
}
```

Here we are handling the _Redux actions_ and updating the store accordingly.

We need to register this reducer inside our __construct__:

```
const mapConstruct = ({
  defaultZoom = 1
}) => ({
  defaultZoom,
  reduce,
  selector: mapSelector
});
```

## Using our Construct

So we now have a construct that provides the current zoom level and a handler for updating that zoom level. Let's show how easy this is to use in our code:

```
import connect from '@airglow/deep-connect';
import { selector } from '@airglow/prefab';

const MapApp = (smallMap, largeMap) => {
	<div>
      <Map {...smallMap} />
      <Map {...largeMap} />
	</div>
}

const mapForm = selector({
  smallMap: 'smallMap',
  largeMap: 'largeMap'
});

export default connect({ mapForm }, Component);
```
