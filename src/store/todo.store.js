import { Todo } from "../todos/models/todo.model";

const Filters = { //* enum
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [
        new Todo('Piedra del alma'),
        new Todo('Piedra del infinito'),
        new Todo('Piedra del tiempo'),
        new Todo('Piedra del poder'),
        new Todo('Piedra del realidad'),
    ],
    filter: Filters.All
}


const initStore = () => {
    loadStore();
    console.log('InitStore🥑');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos; //* si no vienen todos estará vacio
    state.filter = filter; //* si no viene filtro será all por default
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state) );
}

const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        // break; //* si se llamo al return no hace falta el break;
        case Filters.Completed:
            return state.todos.filter(todo => todo.done); //* si es true
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done); //* si es false
        default:
            throw new Error(`Option ${filter} is not valid`);
            break;
    }
}

 /**
  * 
  * @param {String} description 
  */
const addTodo = (description) => {
    if (!description) throw new Error('Description is requiered');
    state.todos.push(new Todo(description));

    saveStateToLocalStorage();
}

/**
 * 
 * @param {String} todoId 
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }
        return todo; //* retornar el todo
    });

    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();

}

const deleteCompleted = (todoId) => {//* elimina los que estan completados
    state.todos = state.todos.filter(todo => todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    //* investigar validacion Object.keys() , un codigo permitido
    state.filter = newFilter;
    saveStateToLocalStorage();

}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    deleteCompleted,
    deleteTodo,
    getCurrentFilter,
    getTodos,
    initStore,
    loadStore,
    setFilter,
    toggleTodo,
}