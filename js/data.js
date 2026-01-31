let groceryItems = JSON.parse(localStorage.getItem('groceryItems')) || [];

const saveToLocalStorage = () => {
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
};

const getItems = () => {
    return groceryItems;
};


const addItem = (itemText) => {
    const newItem = {
        id: Date.now().toString(),
        text: itemText.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    groceryItems.unshift(newItem); 
    saveToLocalStorage();
    return newItem;
};
const editItem = (id, newText) => {
    const item = groceryItems.find(item => item.id === id);
    if (item) {
        item.text = newText.trim();
        item.updatedAt = new Date().toISOString();
        saveToLocalStorage();
        return item;
    }
    return null;
};
const deleteItem = (id) => {
    const initialLength = groceryItems.length;
    groceryItems = groceryItems.filter(item => item.id !== id);
    if (groceryItems.length < initialLength) {
        saveToLocalStorage();
        return true;
    }
    return false;
};

const toggleComplete = (id) => {
    const item = groceryItems.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        item.updatedAt = new Date().toISOString();
        saveToLocalStorage();
        return item;
    }
    return null;
};

const clearAllItems = () => {
    groceryItems = [];
    saveToLocalStorage();
};


export { 
    groceryItems, 
    saveToLocalStorage, 
    getItems, 
    addItem, 
    editItem, 
    deleteItem, 
    toggleComplete, 
    clearAllItems 
};
