# Airglow Reducers

A library for building simple elegant reducers.

## Reducer Basics

Take a look at [Redux's Reducer definition] for more details, but basically, a _Reducer_ is a function that transforms a provided state based on an action that takes place.

So basically, you get a function that looks something like this:
```
(previousState, action) => newState
```

We pass in the old state and an action and return the new state.

Let's define a couple important rules for _Reducers_

1. _Reducers_ must be pure. This means that _Reducers_ do not depend on or modify the state of any variables out of its scope. They are self contained, they never access any data that isn't provided to them
2. _Reducers_ must not modify the provided _state_ or _action_. You must clone the _state_ before making any changes. We use libraries like [Ramda](ramdajs.com) to modify our objects.

## slice

Within our store, we will want to break our state into separate "slices". Look at the following example store:

```
{
  iceCreamForm: {
    topping: 'chocolate',
    flavor: 'strawberry',
    container: 'waffle cone'
  },
  pizzaForm: {
    topping: 'sausage',
    crust: 'thin',
    size: 'large'
  }
}
```

We have an ice cream form and a pizza form. Each will likely have a set of unique reducers. The common pattern is to group all of reducers for our slice in a single file using _call_. _call_ is explained in the next section.

Once we have your separate files, we can create another reducer file that holds our slices:

```
import { call, slice } from '@airglow/reducers';
import iceCreamReducers from 'iceCream/reducers';
import pizzaReducers from 'pizza/reducers';

export default call(
  slice('iceCreamForm').with(iceCreamReducers),
  slice('pizzaForm').with(pizzaReducers)
);
```

### More info about slices:

* The reducers of a slice now only see their section of the store. For example:

```
export const reduceTopping = (state, action) => Rambda.assoc('topping', action.payload, state);
```

We are provided the _iceCreamForm_ section of the state, and as such, we just need to modify the _topping_ part of that state.

* Slices can be nested. For example, let's say we now want to have a forms slice in our store. We can do the following:

```
import { mix, slice } from '@airglow/reducers';
import formReducers from 'form/reducers';

export default slice('form').with(formReducers);
```

Now we'll have a store that looks like:

```
form: {
  iceCreamForm: { ... },
  pizzaForm: { ... }
}
```


* You can reslice an existing slice. Let's say I'm using the form store in the previous example and I want to add a new form. I can easily do the following:

```
import { slice } from '@airglow/reducers';
import newFormReducers from 'newForm/reducers';

export default slice('form').with(newFormReducers);
```

## call

The provided _call_ reducer simply calls all it's provided reducers when it is invoked. For example:

```
import { call } from '@airglow/reducers';
import { toppingReducer, sizeReducer, crustReducer } from 'pizza/reducers';

export default call(
  toppingReducer,
  sizeReducer,
  crustReducer
);
```

This example is identical to the following:

```
import { call } from '@airglow/reducers';
import { toppingReducer, sizeReducer, crustReducer } from 'pizza/reducers';

export default (state, action) => {
  let processed = state;
  processed = toppingReducer(state, action);
  processed = sizeReducer(state, action);
  processed = crustReducer(state, action);
  return processed;
);
```


### for

_call_ accepts an addition method that let's you define which actions should trigger the reducer.

```
export default call(
  call(toppingReducer).for('addTopping', 'removeTopping'),
  call(sizeReducer).for('changeSize'),
  call(crustReducer).for('changeCrust')
);
```

Here, the topping reducer only gets called when an `addTopping` or `removeTopping` action is triggered.

### when

_call_ also accepts custom validators. These validators receive the `state` and `action` and can test whether or not to run the reducer.

```
const isNewTopping = (state, action) =>
  state.toppings.indexOf[action.payload] < 0;

export default call(
  call(toppingReducer)
    .for('addTopping')
    .when(isNewTopping)
)
```

If the topping is already in the list, then we don't run the topping reducer.

## reduce

This is a super simple way of saying, always set the value of some `field` to the value in the `payload`.

```
export default call(
  reduce('crust').for('changeCrust')
);
```

Now if I send in an action like the following:
```
{ type: changeCrust, payload: 'deep' }
```
my store's value for `crust` would update to `deep`

### to

On occassion, you always want to reduce to a specific value. For example:
```
export default call(
  reduce('mode').to('creating').for('startPizza'),
  reduce('mode').to('buying').for('completePizza'),
);
```

Now, the `mode` will always be set to `creating` for a start pizza event, no matter what's in the payload.

## copy

Copies an existing field in the store to another field:
```
export default call(
  copy('saved').from('pizza').for('savePizza')
);
```

Now, when we call `savePizza`, our store will copy the current value in `pizza` to `saved`.

## extract

Sometimes, your payload is more complex. You can use _extract_ to get the specific fields you care about.

```
export default call(
  extract('crust', 'size', 'toppings').for('updatePizza')
);
```

Now, if I send an action like:
```
{
  type: updatePizza,
  payload:
  {
    crust: 'deep',
    toppings: ['sausage', 'bellpeppers'],
    size: 'small'
  }
}
```
my store updates accordingly.

Note that the payload keys must match the store keys when using extract.

## toggle

Assuming you have a value in your store that is a boolean, _toggle_ can be used to switch back and forth between `true` and `false`.

```
export default call(
  toggle('enabled').for('toggleEnabled')
);
```
`enabled` toggles between `true` and `false`

## initilize

Sets the initial value for an item in the store. This takes an object and a callback. The callback is provided with the default values when the store is empty:

```
export default initilize(
  {
    crust: 'regular',
    size: 'medium',
    toppings: []
  },
  call(
    extract('crust', 'size', 'toppings').for('updatePizza')
  )
);
```

Which initilizes the store to:
```
{
  crust: 'regular',
  size: 'medium',
  toppings: [],
  initializedTo: {
    crust: 'regular',
    size: 'medium',
    toppings: [],
  }
}
```

Note the `initilizedTo` section of the store. This holds the initial values so that _reset_ can work properly.

### reset

Allows you to reset fields in the store back to their original values. You can either do it one at a time:

```
export default call(
  initialize('crust').to('regular'),
  initialize('size').to('medium'),
  initialize('toppings').to([]),
  reset('crust', 'size').for('changePizza')
);

```

Or reset your whole slice at once:
```
export default call(
  initialize('crust').to('regular'),
  initialize('size').to('medium'),
  initialize('toppings').to([]),
  reset().for('cancelPizza')
);
```

