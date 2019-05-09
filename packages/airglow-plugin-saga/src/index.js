/*
 * ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 *   Copyright 2017 Adobe Systems Incorporated
 *   All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by all applicable intellectual property
 * laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 * ************************************************************************
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
  middleware.run(sagas);
};
