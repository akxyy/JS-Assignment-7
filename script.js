document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayDescription(data.description);
            displayItems(data.items, data.metadata);
            setupAddItemForm(data.items, data.metadata);
        });
});

function displayDescription(description) {
    const Description = document.getElementById('description');
    Description.textContent = description;
}

function displayItems(items, metadata) {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        const creationDate = new Date(metadata.creationDate).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        card.innerHTML = 
           `<h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: ${item.price}</p>
            <div class="metadata">
                <p>Author: ${metadata.author}</p>
                <p>Created on: ${creationDate}</p>
            </div>`
        ;

        cardContainer.append(card);
    });
}

function filterByPrice() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredItems = data.items.filter(item => item.price >500);
            displayItems(filteredItems, data.metadata);
        });
}

function setupAddItemForm(items, metadata) {
    const form = document.getElementById('add-item-form');

    form.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('item-name').value;
        const description = document.getElementById('item-description').value;
        const price = parseFloat(document.getElementById('item-price').value);

        const newItem = { name, description, price };
        items.push(newItem);

        displayItems(items, metadata);
        form.reset();
    });
}

function sortItems(property, order) {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const sortedItems = [...data.items].sort((a, b) => {
                if (order === 'asc') return a[property] > b[property] ? 1 : -1;
                return a[property] < b[property] ? 1 : -1;
            });
            displayItems(sortedItems, data.metadata);
        });
}