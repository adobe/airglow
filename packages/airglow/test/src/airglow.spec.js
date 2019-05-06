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

import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import Airglow from '../../src/airglow';
import * as engine from '../../src/engine';
import { COMPONENT, HOC } from '../../src/types';
import { fakeStore } from '../../src/util/test.util';

let bootstrapSpy;


const Renderer = props => (
  <div {...props} />
);

const components = [
  {
    index: 1,
    callback: <div key="V">Version 2.1</div>,
    type: COMPONENT
  },
  {
    index: 5,
    callback: <div key="Q">Smokey</div>,
    type: COMPONENT
  }
];
const wrappers = [
  {
    index: 3,
    callback: {
      component: props => <div {...props} />,
      props: { className: 'sugar', key: 'C' }
    },
    type: HOC
  }
];

describe('airglow', () => {
  afterEach(function () {
    engine.default.restore();
  });

  const stubEngine = ({ components: cs = [], wrappers: wrs = [] } = {}) => {
    bootstrapSpy = sinon.spy();
    sinon.stub(engine, 'default').callsFake(() => ({
      store: 'STORE!',
      getPluginsData: (type) => {
        if (type === COMPONENT) { return cs; }
        if (type === HOC) { return wrs; }
        return [];
      },
      bootstrapModule: bootstrapSpy
    }));
  };

  it('should pass the plugins into the engine', function () {
    stubEngine();
    shallow(<Airglow store={fakeStore} plugins={['a', 'b', 'c']} />);
    expect(engine.default.lastCall.args[0]).toMatchSnapshot();
  });

  it('should render children correctly', function () {
    stubEngine();
    expect(mount(
      <Airglow store={fakeStore} renderer={Renderer}>
        <button type="button">Test</button>
      </Airglow>
    ).text()).toBe('Test');
  });

  it('should accept multiple children', function () {
    stubEngine();
    const tree = mount(
      <Airglow store={fakeStore} renderer={Renderer}>
        <button type="button" key="TestA">Test A</button>
        <button type="button" key="TestB">Test B</button>
      </Airglow>
    );

    expect(tree.find('button')).toHaveLength(2);
  });

  it('should append component plugins', function () {
    stubEngine({ components });
    const tree = mount(
      <Airglow store={fakeStore} renderer={Renderer}>
        <div key="TestA">Test</div>
      </Airglow>
    );
    expect(tree.debug()).toMatchSnapshot();
  });

  it('should wrap higher order components around the content', function () {
    stubEngine({ wrappers });
    const tree = mount(
      <Airglow store={fakeStore} renderer={Renderer}>
        <div key="A">Test</div>
      </Airglow>
    );
    expect(tree.debug()).toMatchSnapshot();
  });

  it('should render in order', () => {
    stubEngine({ wrappers, components });
    const tree = mount(
      <Airglow store={fakeStore} renderer={Renderer}>
        <div key="A">Test</div>
      </Airglow>
    );
    expect(tree.debug()).toMatchSnapshot();
  });

  it('should use the engines bootstrap function', function () {
    stubEngine();
    const rendered = mount(<Airglow store={fakeStore} plugins={[]} renderer={Renderer} />);
    rendered.find(Renderer).props().value.bootstrap('zipper');
    expect(bootstrapSpy.calledWith('zipper')).toBe(true);
  });
});
