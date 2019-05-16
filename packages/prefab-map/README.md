# Prefab-Map

A custom [Prefab](../packages/prefab) for dealing with map views. It allows you to manage map zoom level, mode, position, and more.

## Installation

```
npm install --save @airglow/prefab @airglow/prefab-map
```

## Getting Started

To add the Map Prefab, you simply need to import the prefab somewhere in your code:

```js
import '@airglow/prefab-map';
```

Now you're ready to go.

## Usage

You may create a map prefab like so:

```js
import prefab from '@airglow/prefab';

export default prefab({
  map: {
    type: 'map',
    defaultZoom: 3
  }
});

const mapState = state => ({
  zoom: prefab.map.zoom(state),
  mode: prefab.map.mode(state),
  position: prefab.map.position(state)
});

const mapHandlers = dispatch => ({
  onToggleMode: () => dispatch(prefab.map.toggleModeAction()),
  onPostiion: (latitude, longitude) => dispatch(prefab.map.positionAction({
    latitude, longitude
  })),
  onZoomOut: () => dispatch(prefab.map.zoomOutAction()),
  onZoomIn: () => dispatch(prefab.map.zoomInAction())
});

connect(mapState, mapHandlers)(View);
```

## Selectors

The following items take the state object:

| Selector | Description |
| -------- | ----------- |
| zoom | The current zoom level of the map
| mode | The current mode (map or satellite)
| position | The current center point of the map (`[latitude, longitude]`)


## Handlers

The following actions can be dispatched to update the map's store:

| Handlers | Input | Description |
| -------- | ----- | ----------- |
| toggleModeAction | none | Toggles map mode betweein map and satellite
| positionAction | `{ latitude: X, longitude: Y }` | Sets the map center position
| zoomInAction | none | Zooms the map in one level. Often used with a button.
| zoomOutAction | none | Zooms the map out one level. Often used with a button.
| zoomAction | new zoom level | Sets a new zoom level. Often used with mouse-wheel zooms
