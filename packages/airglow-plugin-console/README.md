# Airglow Plugin-Console

An Airglow plugin that registers functions that can be executed from the command line. When those functions are called, we'll pass in the current state and dispatcher so that they can be used to provide info to the users.

## Installation

```
npm install --save @airglow/plugin-console
```

## Usage

To enable, add the plugin:

```js
import consolePlugin from '@airglow/console-plugin';

const App = () => (
  <Airglow plugins={{
    consolePlugin()
  }}>
    <AppContainer />
  </Airglow>
);
```

### Configuration options

`help`: defines the command you want to use to show a list of all available console commands. (`help()` by default)

### Configuring Commands

When you are setting up your modules, you can now pass in `consoleCommands`:

```js
<AirglowWrapper
  config={{
    consoleCommands: {
      userInfo: {
        description: 'Lists all the information we know about the active user',
        command: ({ state }) => console.log(state.userInfo)
      }
    }
  }}
>
  <App />
</AirglowWrapper>
```

Now, when you call `userInfo()` from the command line, the provided `command` is executed.

The commands are passed an object containing `{ state, dispatch }`. The state is the current state and dispatch is the store's dispatcher.

The provided `description` is displayed when you enter the `help()` command in the console.
