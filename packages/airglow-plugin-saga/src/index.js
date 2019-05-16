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

import createSagaMiddleware from 'redux-saga';
import { FEATURE, MIDDLEWARE, BOOTSTRAP_MODULE } from 'airglow';

export const SAGA = 'wire_sagas';

export default function sagaPlugin() {
  const middleware = createSagaMiddleware();

  return (engine) => {
    engine.plugin(MIDDLEWARE, middleware);
    engine.plugin(FEATURE, sagaFeature(middleware));
    engine.plugin(BOOTSTRAP_MODULE, bootstrapSagas(middleware));
  };
}

const sagaFeature = middleware => lookup =>
  lookup(SAGA).forEach(
    plugin => middleware.run(plugin)
  );

const bootstrapSagas = middleware => ({ sagas }) => {
  if (!sagas) { return; }
  const runSagas = Array.isArray(sagas) ? sagas : [sagas];
  runSagas.forEach(saga => middleware.run(saga));
};
