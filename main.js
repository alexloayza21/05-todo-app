import './style.css';
import { App } from './src/todos/app';
import todoStore from './src/store/todo.strore';

todoStore.initStore();

App('#app');