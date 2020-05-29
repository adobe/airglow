# Airglow

[![CircleCI](https://img.shields.io/circleci/project/github/adobe/airglow/master.svg?logo=circleci)](https://circleci.com/gh/adobe/workflows/airglow)
[![Code Coverage](https://img.shields.io/codecov/c/github/adobe/airglow/master.svg?logo=codecov)](https://codecov.io/gh/adobe/airglow/branch/master) 

Airglow is a Javascript framework that provides a clean, simple wrapper over all your other favorite frameworks.

At it's roots, Airglow sets up a data storage layer (like Redux) and connects all the various tools you need (routing, localization, etc) without the need of heavy boilerplate code.

## Intallation

To install the stable version:

```
npm install --save airglow
```

Next, you need to decide on the your data storage layer

## Data Stores

Currently, Airglow supports Redux and a generic React storage solution. We're working towards offering support for other stores like Mobx in the future.

Here's more details about the current data storage layers:

### Redux

We're big Redux fans at Airglow and love the versitility and robust feature set that allows us to build some really cool things. Here are some of the biggest benefits of the [Redux Store](./packages/airglow-store-redux):

 * Robust and well tested solution with building blocks like Middlewares and Enhancers
 * Required for many Airglow plugins
 * Redux Dev Tools!

But Redux can be overkill for many solutions.

To install the Redux store:

```
npm install --save @airglow/store-redux
```

### React Store

Our custom [React Store](./packages/airglow-store-react) uses a Provider and Consumers to do very barebones data storage.

It has a much smaller footprint since it requires nothing more than the React you already have installed.

To install the React store:

```
npm install --save @airglow/store-react
```

### Which store is right for me?

That depends. If you are looking to leverage Airglow for all it has to offer, you'll want the Redux Store. If you just need to store some data and maybe do some higherorder components, then the React Store will suffice.

## Plugins

Plugins are what makes Airglow so powerful. You can mix and match any of the plugins, or quickly write your own. Here is a list of many of the existing plugins:

| Name        | Description |
| ----------- | ----------- |
| [Prefab](./packages/airglow-plugin-prefab) | Out of the box reducers and selectors for common datatypes |
| [DevTools](./packages/airglow-plugin-devtools) | Enables the React and Redux devtools  |
| [Saga](./packages/airglow-plugin-saga) | Adds Redux-Saga to your Redux store  |
| [Test](./packages/airglow-plugin-test) | Used for testing. Adds a copy of all dispatched events into the store  |

## Getting Started

Let's run through a simple example setting up Airglow for a todo app. You may find the full code for this and other samples in the [samples folder](./packages/samples).

### Airglow Setup

For the following example, we're going to use a Redux store and use a pair of Prefabs to store a list of Todo items and a Todo input value:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import Airglow from 'airglow';
import ReactStore from '@airglow/store-redux';
import MainContainer from './containers/main.container';

const App = () => (
  <Airglow
    store={ReduxStore}
    plugins={plugins}
    bootstrap={bootstap}
  >
    <MainContainer />
  </Airglow>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

So I'm initializing Airglow with my store of choice (Redux), a set of defined plugins, and a set of bootstrap instructions.

Under the covers, we are creating a new Redux store, setting up and required middlewares and enhancers, registering all needed reducers, generating higher-order components, and all sorts of other things.

Lets take a look at the plugins file:

### Plugins

```js
import prefabPlugin from '@airglow/plugin-prefab';
import devtoolPlugin from '@airglow/plugin-devtools';

const plugins = [
  devtoolPlugin({ reduxBrowser: true }),
  prefabPlugin()
];
```

As you can see, we're using two plugins. To initialize a pluging you simply pass it an optional configuration object.

### Bootstrap

Some plugins require additional configuration. They are broken out of the main configuration to allow you to choose when this configuration is executed (allowing for lazy loading and web modules among other things).

Let's take a look at the sample bootstrap config:

```js
import prefab from '@airglow/prefab';

const prefabs = prefab({
  newTodo: { type: 'value' },
  todoList: { type: 'list' }
});

export const {
  newTodo,
  todoList
} = prefabs;

export default {
  name: 'sample-todo',
  prefab: prefabs
};
```

Here we've configured a `todoList` Prefab and a `newTodo` Prefab. This provides us with all the selectors, actions, and reducers we need to build our todo app.

Note that we export our Prefabs individually so they can be accessed elsewhere in our application.

### Container

Let's look at how we've wired up our Prefabs in our container:

```js
import { connect } from 'react-redux';
import TodoUI from '../components/todo.ui';
import { newTodo, todoList } from '../bootstrap.config';

const mapState = state => ({
  newValue: newTodo.value(state),
  todos: todoList.value(state)
});

const mapHandlers = dispatch => ({
  onSave: (v) => {
    dispatch(todoList.addAction(v));
    dispatch(newTodo.changeAction());
  },
  onChange: v => dispatch(newTodo.changeAction(v)),
  onDelete: v => dispatch(todoList.removeAtAction(v))
});

export default connect(mapState, mapHandlers)(TodoUI);
```

As you can see, our Prefabs have all the actions needed to update their store values and the selectors needed to grab the data.

