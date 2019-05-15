# Prefab-Form

A custom [Prefab](../packages/prefab) for dealing with forms and form elements. The basic Value Prefab let's you set and get the value. The FormField prefab adds in bells and whistles like validation.

## Installation

```
npm install --save @airglow/prefab @airglow/prefab-form
```

## Getting Started

To add Form Prefabs, you simply need to import the prefab somewhere in your code:

```js
import '@airglow/prefab-form';
```

Now you're ready to go.

## FormField Prefabs

You may choose to use the FormField Prefabs directly:

```js
import prefab from '@airglow/prefab';

export default prefab({
  toppings: {
    type: 'formField',
    defaultValue: 'cheese',
    required: true,
    whenToValidate: 'blur'
  },
  size: {
    type: 'formField',
    fieldType: 'number',
    defaultValue: 2,
    max: 15,
    autocorrect: 'immediate'
  }
});
```

Here we're creating two FormField Prefabs. One is a text field and one is a number field. Let's go into details on the various configuration options for the form fields.

### fieldType

The following lists the supported values for __fieldType__:

| Type | Description | Example |
| ---- |------------ | ------- |
| text (default) | A text string | Hello World |
| number | A number | 7.2 |
| email | An email address | abc@xyz.com |
| alphanum | A combination of numbers and letters | ABC123 |
| ip | A valid ip address | 21.34.106.99 |
| uri | A complete URL | http://www.abc.com/index.html |

### whenToValidate

You may use the __whenToValidate__ option when configuring your form fields to determine when you want validation to occur.

The following are valid options for __whenToValidate__:

* always: will always show validation errors, even before editing
* focus: will show validation errors as soon as an element is clicked on
* blur: will show validation errors after clicking outside the elemeent
* submit: only starts showing validation errors once the user submits the form
* never: never show validation errors

Errors will be passed when selecting your form fields if there is a validation error and the __whenToValidate__ event has occured.

### autocorrect

When enabled, your form fields can attept to autocorrect invalid values. For example, if the maximum number for a field is _30_ and a user enters _35_, the value will change to _30_ if autocorrect is enabled.

The following are valid options for __autocorrect__:
* disabled: never autocorrect
* enabled: autocorrects on a blur event
* immediate: autocorrects as the field recieves input.

### sourceSelector

Defines a selector that should be called to get the current (undirty) data for the form. The selector will get the current state passed in:

```js
export default prefab({
  quantity: {
    type: 'formField',
    sourceSelector: state => state.originalData.quantity,
  }
});
```

### Aditional Options

| Option | Description | Autocorrects? | fieldTypes |
| ------ | ----------- | ------------- | ---------- |
| required | is this value required | No | all |
| default | the default value | N/A | all |
| min | the min value (number fieldType) or min string length | (for numbers) | all |
| max | the max value (number fieldType) or max string length | Yes | all |
| greater | number must be greater than the value | Yes | number |
| less | number must be lest than the value |  Yes | number |
| length | absolute string length | No | text |
| regex | string must match provided regular expression | No | text |
| integer |  enforces the number must be an integer (no decimals) | Yes | number |
| precision | the number must have fewer decimal points than this | Yes | number
| step | the amount jump when clicking the up and down chevrons | N/A | number

### Selectors

The a FormField prefab provdies a bunch of different selectors you can pass into your views:

| Selector | Input | Description |
| value | state | Returns the current value for the field. |
| error | state | Returns an error if the data is invalid and the __whenToValidate__ event has triggered.
| isInvalid | state | Is the data currently invalid (reguardless of the __whenToValidate__ flag)
| isDirty | state | has the value changed from the source/default value
| changeAction | value to change to | an action that can be dispatched to update the field's value |
| resetAction | none | action to dispatch to reset the stored value of the field
| state | state | pulls all the data needed to display the field into an object
| handlers | dispatch | pulls all the event handlers needed to react to the field into an object

## Form

The Form Prefab is a convientient way to group a set of FormField Prefabs together:

```js
import prefab from '@airglow/prefab';

export default prefab({
  pizzaOrder: {
    fields: {
      toppings: {
        defaultValue: 'cheese',
        required: true,
        whenToValidate: 'blur'
      },
      size: {
        fieldType: 'number',
        defaultValue: 2,
        max: 15,
        autocorrect: 'immediate'
      }
    }
  }
});
```

### Field Names
To avoid name conflicts, inside your store, the form field data will be stored at `<FORM NAME>#<FIELD_NAME>`.

When selecting data for the view, the fields will be `<FIELD_NAME>Field`, unless you provide a `fieldName` property in the FormField's config.

When exporting data, the field will just be `<FIELD_NAME>`, unless you provide an `externalName` property in the FormField's config.

### Form Options
The __whenToValidate__, __autocorrect__, and __sourceSelector__ options can be provided in the Form's config. All FormFields will default to these values unless an override is provided.

For __sourceSelector__ you'll need to return the full source in an object like:

```js
export default prefab({
  pizzaOrder: {
    fields: {
      toppings: { },
      size: {
        fieldType: 'number'
      }
    }
  },
  sourceSelector: state => ({ toppings: 'cheese', size: 'M' })
});
```

### Form Selectors
The Form provides a few selectors that map all of the child selectors:

| Selector | Input | Description |
| state | state | returns the full state of all the form's fields
| handlers | dispatch | returns all the handlers of all the form's fields
| export | state | prepares data for an external service, listing all the current values
| isInvalid | state | is true if any field is invalid (reguardless of the __whenToValidate__ flag)
| isDirty | state | is true if any field is dirty
| resetActions | the full list of reset actions that should be triggered to reset the form

One note on export: all field will be included in the resulting object. If some fields are only for the local view, you may use the `local: true`, configuration option on that Form Field and it will be omitted from exports.








