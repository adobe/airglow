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
import TodoList from '../components/todo.list';
import { todoList } from '../data/prefabs';

const mapState = state => (
  {
    todos: todoList.value(state) || []
  }
);

const mapHandlers = dispatch => ({
  onDelete: v => dispatch(todoList.removeAtAction(v))
});

export default connect(mapState, mapHandlers)(TodoList);
