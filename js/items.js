import { getItems, deleteItem, toggleComplete, clearAllItems } from './data.js';
import { createGroceryItemElement } from './single-item.js';


const groceryList = document.getElementById('groceryList');
const groceryContainer = document.getElementById('groceryContainer');
const clearBtn = document.getElementById('clearBtn');


const displayItems = () => {
    const items = getItems();

    
    groceryList.innerHTML = '';

    if (items.length === 0) {
        
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

  
    groceryContainer.classList.add('show-container');

  
    items.forEach(item => {
        const itemElement = createGroceryItemElement(item);
        groceryList.appendChild(itemElement);
    });

    
    addItemEventListeners();
};


const addItemEventListeners = () => {
    
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

    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemElement = e.target.closest('.grocery-item');
            const id = itemElement.dataset.id;
            const currentText = itemElement.querySelector('.item-content').textContent;

           
            import('./data.js').then(module => {
                
                const event = new CustomEvent('editItem', {
                    detail: { id, currentText }
                });
                document.dispatchEvent(event);
            });
        });
    });

   
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


const showAlert = (message, type) => {
    const alertDiv = document.getElementById('alert');
    alertDiv.textContent = message;
    alertDiv.className = `alert ${type}`;

    setTimeout(() => {
        alertDiv.className = 'alert';
    }, 3000);
};


displayItems();


export { displayItems, showAlert };
