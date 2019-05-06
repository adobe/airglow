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

import { connect } from '@airglow/store-react';
import TodoForm from '../components/todo.form';
import { newTodo, todoList } from '../data/prefabs';

const mapState = state => ({
  value: newTodo.value(state) || ''
});

const mapHandlers = dispatch => ({
  onSave: (v) => {
    dispatch(todoList.addAction(v));
    dispatch(newTodo.changeAction());
  },
  onChange: v => dispatch(newTodo.changeAction(v))
});

export default connect(mapState, mapHandlers)(TodoForm);
