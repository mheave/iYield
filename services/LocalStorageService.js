var storage = require('node-persist');


class LocalStorageService
{
    constructor(){
       storage.initSync();
    }    

    addItemToList(listKey, item){
        let itemArray = this.getItemFromStorage(listKey);
        if(itemArray == undefined || itemArray === null){
            itemArray = [];
        }
        itemArray.push(item);
        this.saveItemToStorage(listKey, itemArray);
    }

    getItemFromStorage(key){
        return storage.getItemSync(key);
    }

    saveItemToStorage(key, item){
        storage.setItemSync(key, item);
    }
}

module.exports = LocalStorageService;