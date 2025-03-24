
export const todosModule = {
    state: {
        todos: [],
        filter: 'all',
        searchQuery: '',
    },
    getters: {
        filteredTodos(state) {
            let filtered = state.todos;

            if (state.searchQuery) {
              filtered = filtered.filter(todo =>
                todo.title.toLowerCase().includes(state.searchQuery.toLowerCase())
              );
            }
        
            if (state.filter === 'completed') {
              return filtered.filter(todo => todo.completed);
            } else if (state.filter === 'active') {
              return filtered.filter(todo => !todo.completed);
            }
            return filtered;
        }
    },
    mutations: {
        setTodos(state, todos) {
          state.todos = todos;
        },
        addTodos(state, todo) {
          state.todos.push(todo);
        },
        toggleTodo(state, id) {
          const todo = state.todos.find(t => t.id === id);
          if (todo) todo.completed = !todo.completed;
        },
        setFilter(state, filter) {
          state.filter = filter;
        },
        setSearchQuery(state, query) {
          state.searchQuery = query;
        }
    },
    actions: {
        async fetchTodos({ commit }) {
          const response = await fetch('/todos.json');
          const todos = await response.json();
          commit('setTodos', todos);
        },
        addTodo({ commit }, title) {
          const newTodo = {
            id: Date.now(),
            title,
            completed: false
          };
          commit('addTodos', newTodo);
        },
        toggleTodo({ commit }, id) {
          commit('toggleTodo', id);
        },
        setFilter({ commit }, filter) {
          commit('setFilter', filter);
        },
        setSearchQuery({ commit }, query) {
          commit('setSearchQuery', query);
        }
    },
    namespaced: true,
}