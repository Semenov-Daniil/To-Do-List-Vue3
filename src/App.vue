<template>
  <div>
    <h1>To-Do List</h1>
    <input 
      type="text"
      v-model="newTodo"
      @keyup.enter="addTodo"
      class="todo-input"
      placeholder="Добавить задачу"
    />
    <todo-list :todos="filteredTodos">
      <template #default="{ todo }">
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button @click="toggleTodo(todo.id)" class="toggle-btn">✓</button>
      </template>
    </todo-list>
    <todo-filter @update-filter="setFilter" />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import TodoList from './components/TodoList.vue';
import TodoFilter from './components/TodoFilter.vue';

export default defineComponent({
  components: { TodoList, TodoFilter },
  setup() {
    const store = useStore();
    const newTodo = ref('');
    const filteredTodos = computed(() => store.getters['todos/filteredTodos']);

    onMounted(async () => {
      await store.dispatch('todos/fetchTodos');
    });

    const addTodo = () => {
      if (newTodo.value.trim()) {
        store.dispatch('todos/addTodo', newTodo.value);
        newTodo.value = '';
      }
    };

    const toggleTodo = (id) => {
      store.dispatch('todos/toggleTodo', id);
    };

    const setFilter = (filter) => {
      store.dispatch('todos/setFilter', filter);
    };

    return {
      newTodo,
      addTodo,
      toggleTodo,
      setFilter,
      filteredTodos
    };
  }
})

</script>

<style>
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #42b883;
  text-align: center;
}

.todo-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 2px solid #42b883;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.todo-input:focus {
  border-color: #35495e;
  outline: none;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, background-color 0.3s ease;
}

.todo-item:hover {
  transform: scale(1.02);
}

.completed {
  text-decoration: line-through;
  color: #35495e;
}

.toggle-btn {
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover {
  background-color: #35495e;
}

/* Анимации для transition-group */
.todo-enter-active,
.todo-leave-active {
  transition: all 0.5s ease;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.todo-move {
  transition: transform 0.5s ease;
}
</style>
