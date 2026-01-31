// Single grocery item component
const createGroceryItemElement = (item) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'grocery-item';
    itemElement.dataset.id = item.id;

    // Check if item is completed
    const isCompleted = item.completed ? 'completed' : '';

    itemElement.innerHTML = `
        <button class="complete-btn ${isCompleted}" title="${item.completed ? 'Mark as pending' : 'Mark as complete'}">
            <i class="fas ${item.completed ? 'fa-undo' : 'fa-check'}"></i>
        </button>
        
        <div class="item-content ${isCompleted}">${item.text}</div>
        
        <div class="item-actions">
            <button class="edit-btn" title="Edit item">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" title="Delete item">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    return itemElement;
};

// Export the function
export { createGroceryItemElement };