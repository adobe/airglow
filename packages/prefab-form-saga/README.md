# Prefab-Form-Saga

A saga written to handle [Prefab Form](../packages/prefab-form) submits. Out of the gates, Prefab Form provides a form submit action that you can wire into your form or buttons. That event doesn't automatically get picked up though. This provides a saga that will validate your form and send off an action accordingly.

## Requirements

In order for this saga to work, you need to be using [Redux Saga](https://redux-saga.js.org). The most common setup in Airglow is to have the following:

 * [Airglow Core](../packages/airglow)
 * [Redux Store](../packages/airglow-store-redux)
 * [Saga Plugin](../packages/plugin-saga)
 * [Prefab Plugin](../packages/plugin-prefab)
 * [Form Prefab](../packages/prefab-form)

## Getting Started

To initialize this saga within Airglow, you'll need to do the following:

```js
import saga from '@airglow/prefab-form-saga';

const App = () => (
  <Airglow
    store={ReduxStore}
    plugins={plugins}
    bootstrap={{
      sagas: saga
    }}
  >
    <MainContainer />
  </Airglow>
);
```

## Configuring Your Form

The basic [Prefab Form](../packages/prefab-form) allows for custom configuration options out of the box. Our saga leverages this and allows you to add the following options:

| Config Key | Description |
| ----------- | ----------- |
| invalidAction | An action to dispatch if the form is invalid. |
| invalidActions | An array of actions to dispatch if the form is invalid. |
| validAction | An action to dispatch if the form is valid. |
| validActions | An array of actions to dispatch if the form is valid. |
| successAction | An action to dispatch if a save operation succeeds. |
| successActions | An array of actions to dispatch if a save operation succeeds. |
| errorActions | An action to dispatch if a save operation failes. |
| errorActions | An array of actions to dispatch if a save operation fails. |
| submitSaga | A custom redux saga to trigger if the form is valid |

Please note, this saga doesn't actually run any save operations. It simply validates and calls the invalid or valid actions accordingly. It is up to you to respond to the `validAction(s)` or provide a `submitSaga`. From there, you must perform the save and trigger the `successActions` and `errorActions` accordingly.

Another thing to note: the success actions will automatically trigger a reset of all the form fields.

## Example Form Prefab

```js
import prefab from '@airglow/prefab';
import '@airglow/prefab-form';
import { showError, submitForm, showSuccess } from 'actions';

export const prefabs = prefab({
  pizzaOrder: {
    type: 'value'
    fields: {
      size: { required: true },
      quantity: { fieldType: 'number', required: true, min: 1, max: 99 },
      toppings: {  }
    },
    invalidAction: showError,
    validAction: submitForm,
    successAction: showSuccess,
    errorAction: showError
  }
});
```
