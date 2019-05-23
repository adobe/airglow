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
import { REDUCER, BOOTSTRAP_MODULE, BOOTSTRAP_PLUGIN } from 'airglow';
import { slice, createAction } from '@airglow/reducers';
import { BOOTSTRAP_CONSOLE } from './actions';
import reducer from './reducers';

const STORE_KEY = 'console-commands';
const doBootstrap  = createAction(BOOTSTRAP_CONSOLE);

export default function prefabPlugin(config) {
  return (engine) => {
    engine.plugin(REDUCER, slice(STORE_KEY).with(reducer));
    engine.plugin(BOOTSTRAP_MODULE, bootstrap(engine));
    engine.plugin(BOOTSTRAP_PLUGIN, bootstrapPlugin(engine, config));
  };
}

const logHelp = ({ state }) => {
  R.forEachObjIndexed(
    ({ description }, key) => {
      console.info(`${key}(): ${description}`); // eslint-disable-line no-console
    },
    state['console-commands']
  );
};

const bootstrapPlugin = (
  engine, { help = 'help', helpDescription = 'Display this help menu', consoleCommands }
) => ({ dispatch }) => {
  bootstrap(engine)({
    dispatch,
    consoleCommands: {
      [help]: { description: helpDescription, command: logHelp },
      ...consoleCommands
    }
  });
};

const bootstrap = engine => ({ dispatch, consoleCommands }) => {
  if (consoleCommands) {
    dispatch(doBootstrap(consoleCommands));
    R.forEachObjIndexed(
      ({ command }, key) => {
        window[key] = () => command({ state: engine.getStore().getState(), dispatch });
      },
      consoleCommands
    );
  }
};
