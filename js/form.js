import { addItem, editItem, getItems } from './data.js';
import { displayItems, showAlert } from './items.js';


const groceryForm = document.getElementById('groceryForm');
const groceryInput = document.getElementById('groceryItem');
const submitBtn = groceryForm.querySelector('.submit-btn');
const alertDiv = document.getElementById('alert');


let isEditMode = false;
let editId = null;


groceryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const itemText = groceryInput.value.trim();
    
    if (!itemText) {
        showAlert('Please enter a grocery item', 'danger');
        return;
    }
    
    if (itemText.length > 100) {
        showAlert('Item name is too long (max 100 characters)', 'danger');
        return;
    }
    
    if (isEditMode) {
        
        const updatedItem = editItem(editId, itemText);
        if (updatedItem) {
            displayItems();
            showAlert('Item updated successfully', 'success');
            resetForm();
        }
    } else {
       
        const existingItems = getItems();
        const duplicate = existingItems.find(
            item => item.text.toLowerCase() === itemText.toLowerCase()
        );
        
        if (duplicate) {
            showAlert('Item already exists in the list', 'danger');
            return;
        }
       
        addItem(itemText);
        displayItems();
        showAlert('Item added successfully', 'success');
        resetForm();
    }
});


const resetForm = () => {
    groceryInput.value = '';
    isEditMode = false;
    editId = null;
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Item';
    submitBtn.style.background = 'linear-gradient(to right, #6a89cc, #4a69bd)';
    groceryInput.focus();
};
document.addEventListener('editItem', (e) => {
    const { id, currentText } = e.detail;
    
    isEditMode = true;
    editId = id;
    groceryInput.value = currentText;
    groceryInput.focus();
    
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    submitBtn.style.background = 'linear-gradient(to right, #00b894, #00a085)';
    
    showAlert('Editing item...', 'edit');
});


export { resetForm };