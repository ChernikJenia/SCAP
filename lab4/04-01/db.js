const events = require('events');

class DB extends events.EventEmitter {
    #data = [
        { id: 1, name: 'Чиж Г.Д.', bday: '12.10.1960'},
        { id: 2, name: 'Колбекбек А.В.', bday: '11.02.2008'},
        { id: 3, name: 'Поридж Д.Д', bday: '30.07.1988'},
    ]
    get() { return JSON.stringify(this.#data); }
    post(obj) { this.#data.push(obj); }
    put(updatedObj) {
        let index = this.#data.findIndex(oldObj => oldObj.id === updatedObj.id);

        if(index !== -1) {
            this.#data[index] = updatedObj;
        }
    }
    delete(id) {
        let index = this.#data.findIndex(oldObj => oldObj.id === id);

        if(index !== -1) {
            this.#data.splice(index, 1)}
        }
}

module.exports.DB = DB;