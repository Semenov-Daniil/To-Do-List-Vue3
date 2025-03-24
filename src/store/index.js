import { createStore } from 'vuex';
import { todosModule } from './modules/todos';

export default createStore({
  modules: {
    todos: todosModule
  }
});
