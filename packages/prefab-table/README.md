# Prefab-Table

A custom [Prefab](../packages/prefab) to help UI applications maintain table component states.

## Installation

```
npm install --save @airglow/prefab @airglow/prefab-table
```

## Getting Started

To add the Table Prefab, you simply need to import the prefab somewhere in your code:

```js
import '@airglow/prefab-table';
```

## Usage

```js
import prefabFactory from '@airglow/prefab';

export default prefabFactory({
  table: {
    type: 'table',
    dataSelector: state => [state.todos],
    columns: {
      text: {
        sorter: 'default'
      },
      assignee: {
        sorter: myCustomNameSorter
      }
    }
  }
});
```

In the above example, the table has two columns: text and assignee. Text column is sorted with default alphabatic order. Assignee is sorted with myCustomNameSorter, which is a custom sorter implemented somewhere else from the UI application.

## Selectors
The table provides the following selectors:

| Selector | Input | Description |
| -------- | ----- | ----------- |
| state | state | returns the full state of the table, columns, sort direction, and selected rows (see below)
| handlers | dispatch | returns all the handlers for the rows and columns (see below)
| addColumnAction | columnName, column configuration | adds a new column for the table to use for sorting
| deselectRowsAction | null \| rowData \| [rowData] | Toggles the selection of a row in the table. If no input is provided then all the selected rows will be cleared
| removeColumnAction | columnName, column configuration | removes added columns only
| toggleRowAction | rowData | Toggles the selection or a row in the table
| selectedData | state | returns the selected rows data

## Table State

| Key | Description |
| --- | ----------- |
| columns | an object containing the visible column prefabs, including any added
| data | The array of data that populates the rows in the table
| hiddenColumns | an object containing hidden column prefabs
| selectedData | an array of data that is contained in the selected rows
| selectedRows | an array of indices that represent the selected rows according to the current sort direction
| sortBy | the name of the column being used to sort the table
| sortDirection | a number representing whether the sort is ascending or descending

## Table Handlers

| Key | Description |
| --- | ----------- |
| hideColumn | hides a column
| onHeaderClick | callback for when a column header is clicked
| onRowClick | callback for when a row is clicked
| showColumn | unhides a column
