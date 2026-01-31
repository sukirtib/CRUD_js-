import { getItems, deleteItem, toggleComplete, clearAllItems } from './data.js';
import { createGroceryItemElement } from './single-item.js';

// DOM Elements
const groceryList = document.getElementById('groceryList');
const groceryContainer = document.getElementById('groceryContainer');
const clearBtn = document.getElementById('clearBtn');

// Display all items
const displayItems = () => {
    const items = getItems();

    // Clear current list
    groceryList.innerHTML = '';

    if (items.length === 0) {
        // Show empty state
        groceryList.innerHTML = `
            <div class="empty-list">
                <i class="fas fa-shopping-basket"></i>
                <p>Your grocery list is empty</p>
                <p class="small-text">Add some items to get started!</p>
            </div>
        `;
        groceryContainer.classList.remove('show-container');
        return;
    }

    // Show container
    groceryContainer.classList.add('show-container');

    // Add items to list
    items.forEach(item => {
        const itemElement = createGroceryItemElement(item);
        groceryList.appendChild(itemElement);
    });

    // Add event listeners to all items
    addItemEventListeners();
};

// Add event listeners to items
const addItemEventListeners = () => {
    // Delete button click
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.grocery-item');
            const id = itemElement.dataset.id;

            if (deleteItem(id)) {
                displayItems();
                showAlert('Item removed successfully', 'success');
            }
        });
    });

    // Edit button click
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.grocery-item');
            const id = itemElement.dataset.id;
            const currentText = itemElement.querySelector('.item-content').textContent;

            // Import editItem from data.js
            import('./data.js').then(module => {
                // We'll handle editing in form.js
                const event = new CustomEvent('editItem', {
                    detail: { id, currentText }
                });
                document.dispatchEvent(event);
            });
        });
    });

    // Complete button click
    document.querySelectorAll('.complete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.grocery-item');
            const id = itemElement.dataset.id;

            const updatedItem = toggleComplete(id);
            if (updatedItem) {
                displayItems();
                const message = updatedItem.completed
                    ? 'Item marked as complete'
                    : 'Item marked as pending';
                showAlert(message, 'success');
            }
        });
    });
};

// Clear all items
clearBtn.addEventListener('click', () => {
    if (getItems().length === 0) {
        showAlert('List is already empty', 'danger');
        return;
    }

    if (confirm('Are you sure you want to clear all items?')) {
        clearAllItems();
        displayItems();
        showAlert('All items cleared', 'success');
    }
});

// Show alert function (to be used by other modules)
const showAlert = (message, type) => {
    const alertDiv = document.getElementById('alert');
    alertDiv.textContent = message;
    alertDiv.className = `alert ${type}`;

    setTimeout(() => {
        alertDiv.className = 'alert';
    }, 3000);
};

// Initialize display
displayItems();

// Export functions
export { displayItems, showAlert };
