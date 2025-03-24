<template>
    <transition-group name="todo" tag="ul" class="todo-list">
        <li v-for="todo in todos" :key="todo.id" class="todo-item">
            <slot :todo="todo"></slot>
        </li>
    </transition-group>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        todos: {
        type: Array,
        required: true
        }
    }
});
</script>