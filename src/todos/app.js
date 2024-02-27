import todoStore from '../store/todo.store';
import html from './app.html?raw'; //* ?raw para importar en crudo
import { renderTodos } from './use-cases/render.todos';

const ElementIDs = {
    TodoList: '.todo-list'
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos( ElementIDs.TodoList, todos );
    }
    
    //* función anónima autoinvocada; Cuando la función se App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

}