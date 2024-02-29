import todoStore from '../store/todo.store';
import html from './app.html?raw'; //* ?raw para importar en crudo
import { renderTodos } from './use-cases/render.todos';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
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


    //* Referencias HTML
    const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.TodoList);

    //* Listener
    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', () => {
        const element = event.target.closest('[data-id]'); //* busca el elemento hmtl que tenga el data atribute mas cercano
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    });

    todoListUL.addEventListener('click', () => { //* aqui estoy dentro del ul del html
        const isDetroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]'); 
        if (!element || !isDetroyElement) return;
        
        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();

    });
}