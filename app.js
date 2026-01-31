
import { displayItems, showAlert } from './js/items.js';
import { resetForm } from './js/form.js';


document.addEventListener('DOMContentLoaded', () => {
    console.log('Grocery Bud App Loaded!');


    displayItems();


    document.getElementById('groceryItem').focus();

    window.showAlert = showAlert;
    window.resetForm = resetForm;
});