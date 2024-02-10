import html from './app.html?raw'; //* ?raw para importar en crudo
/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {
    
    //* función anónima autoinvocada; Cuando la función se App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();

}