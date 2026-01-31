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