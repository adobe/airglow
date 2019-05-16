/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import * as R from 'ramda';
import React from 'react';
import { AirglowProvider, AirglowWrapper } from './airglow.context';
import Engine from './engine';
import { COMPONENT, HOC } from './types';

class Airglow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = this.props.store ? this.props.store() : null;
    this.engine = new Engine(this.store, R.reverse(this.props.plugins || []));

    if (this.props.bootstrap) {
      this.engine.plugin(
        HOC,
        { component: AirglowWrapper, props: { config: this.props.bootstrap } }
      );
    }
  }

  renderChildren() {
    // take our children and merge them with the render plugins
    return R.reduce(
      (children, plugin) =>
        pluginReducers[plugin.type](plugin.callback, children),
      this.props.children,
      R.reverse(getRenderPlugins(this.engine))
    );
  }

  render() {
    const Renderer = this.props.renderer || AirglowProvider;
    return (
      <Renderer
        value={{
          bootstrap: (...args) => this.engine.bootstrapModule(...args),
          dispatch: action => this.engine.getStore().dispatch(action)
        }}
      >
        {this.renderChildren()}
      </Renderer>
    );
  }
}

const reduceHoc = ({ component: Component, props }, children) =>
  <Component {...props}>{children}</Component>;

const reduceComponent = (component, children) => (
  <div id="airglowRootWrapper">
    {children}
    {component}
  </div>
);

const pluginReducers = {
  [HOC]: reduceHoc,
  [COMPONENT]: reduceComponent
};

const getRenderPlugins = engine => R.reverse(R.sortBy(
  R.prop('index'),
  R.concat(
    engine.getPluginsData(HOC) || [],
    engine.getPluginsData(COMPONENT) || []
  )
));

export default Airglow;
