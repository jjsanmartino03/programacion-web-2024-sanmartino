document.addEventListener('DOMContentLoaded', () => {
    const tiendaForm = document.getElementById('tienda-form');
    tiendaForm.addEventListener('submit', createTienda);
    fetchTiendas();

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const createTienda = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value, ciudad = document.getElementById('ciudad').value, duenio = document.getElementById('duenio').value;

    fetch('/api/tiendas/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, ciudad, duenio })
    })
        .then(() => {
            fetchTiendas();
        });
}

const fetchTiendas = () => {
    const tiendaList = document.getElementById('tienda-list');

    fetch('/api/tiendas')
        .then(response => response.json())
        .then(data => {
            tiendaList.innerHTML = '';

            data.forEach(tienda => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper';

                const tiendaDetails = document.createElement('p');
                tiendaDetails.innerHTML = `${tienda.nombre} - ${tienda.ciudad} - ${tienda.duenio}`;
                tiendaDetails.className = 'col s12 m8';

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s6 m2';
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(tienda));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s6 m2';
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => deleteTienda(tienda.id));

                li.appendChild(tiendaDetails);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                tiendaList.appendChild(li);
            });

        });
}

const openEditModal = (tienda) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-tienda-modal'));
    document.getElementById('edit-id').value = tienda.id;
    document.getElementById('edit-nombre').value = tienda.nombre;
    document.getElementById('edit-ciudad').value = tienda.ciudad;
    document.getElementById('edit-duenio').value = tienda.duenio;
    M.updateTextFields();
    modal.open();
}

const editTienda = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const nombre = document.getElementById('edit-nombre').value, ciudad = document.getElementById('edit-ciudad').value, duenio = document.getElementById('edit-duenio').value;

    fetch(`/api/tiendas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, ciudad, duenio })
    })
        .then(() => {
            fetchTiendas();
            const modal = M.Modal.getInstance(document.getElementById('edit-tienda-modal'));
            modal.close();
        });
}

document.getElementById('edit-tienda-form').addEventListener('submit', editTienda);

const deleteTienda = async (id) => {
    await fetch(`/api/tiendas/${id}`, {
        method: 'DELETE'
    });

    fetchTiendas();
}
