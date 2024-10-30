document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    productForm.addEventListener('submit', createProduct);
    fetchProducts();

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const createProduct = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;

    fetch('/api/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price, stock })
    })
        .then(response => {
            if (response.ok) {
                M.toast({html: 'Producto creado con éxito', classes: 'green'});
                fetchProducts();
            } else {
                throw new Error('Error al crear el producto');
            }
        })
        .catch(error => {
            M.toast({html: error.message, classes: 'red'});
        });
}

const fetchProducts = () => {
    const productList = document.getElementById('product-list');

    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = '';
            productList.className = 'collection'; // Materialize class for list

            data.forEach(product => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper'; // Materialize class for list item

                const productDetails = document.createElement('p');
                productDetails.innerHTML = `${product.name} - ${product.description} - ${product.price} - ${product.stock}`;
                productDetails.className = 'col s12 m8'; // Materialize class for column

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s6 m2'; // Materialize class for blue button
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(product));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s6 m2'; // Materialize class for red button
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => openConfirmDeleteModal(product.id));

                li.appendChild(productDetails);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                productList.appendChild(li);
            });

        });
}

const openEditModal = (product) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-product-modal'));
    document.getElementById('edit-id').value = product.id;
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-description').value = product.description;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-stock').value = product.stock;
    M.updateTextFields(); // Update labels for Materialize
    modal.open();
}

const editProduct = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const price = document.getElementById('edit-price').value;
    const stock = document.getElementById('edit-stock').value;

    fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price, stock })
    })
        .then(response => {
            if (response.ok) {
                M.toast({html: 'Producto actualizado con éxito', classes: 'green'});
                fetchProducts();
                const modal = M.Modal.getInstance(document.getElementById('edit-product-modal'));
                modal.close();
            } else {
                throw new Error('Error al actualizar el producto');
            }
        })
        .catch(error => {
            M.toast({html: error.message, classes: 'red'});
        });
}

const openConfirmDeleteModal = (id) => {
    const modal = M.Modal.getInstance(document.getElementById('confirm-delete-modal'));
    document.getElementById('confirm-delete-btn').onclick = () => deleteProduct(id);
    modal.open();
}

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({html: 'Producto eliminado con éxito', classes: 'green'});
            fetchProducts();
        } else {
            throw new Error('Error al eliminar el producto');
        }
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

document.getElementById('edit-product-form').addEventListener('submit', editProduct);