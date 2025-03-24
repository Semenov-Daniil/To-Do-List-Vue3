<template>
  <div class="filter-container">
    <button @click="updateFilter('all')" class="filter-btn">Все</button>
    <button @click="updateFilter('completed')" class="filter-btn">Выполненные</button>
    <button @click="updateFilter('active')" class="filter-btn">Активные</button>
    <input type="text" v-model="search" placeholder="Поиск задач" class="search-input" />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    emits: ['update-filter'],
    setup(props, { emit }) {
        const store = useStore();
        const search = ref('');

        const debounce = (fn, delay) => {
            let timeout;
            return function (...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => fn.apply(this, args), delay);
            };
        };

        const logSearch = function (prefix) {
            console.log(`${prefix}: ${this.value}`);
        };

        watch(search, (newValue) => {
            logSearch.call({ value: newValue }, 'Поиск');
            
            logSearch.apply({ value: newValue }, ['Фильтр']);

            debounce(() => store.dispatch('todos/setSearchQuery', newValue), 500)();
        });

        const updateFilter = (filter) => {
            emit('update-filter', filter);
        };

        return { search, updateFilter };
    }
});
</script>

<style>
.filter-container {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
.filter-btn {
    padding: 8px 16px;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}
  
.filter-btn:hover {
    background-color: #35495e;
    transform: translateY(-2px);
}
  
.search-input {
    padding: 8px;
    border: 2px solid #42b883;
    border-radius: 5px;
    font-size: 14px;
    transition: border-color 0.3s ease;
}

.search-input:focus {
    border-color: #35495e;
    outline: none;
}
</style>