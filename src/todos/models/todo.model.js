import {v4 as uuid} from 'uuid';

export class Todo {
    /**
     * 
     * @param {String} description 
     */
    constructor( decription ) {
        this.id = uuid();
        this.description = decription;
        this.done = false;
        this.createdAt = new Date();
    }
}