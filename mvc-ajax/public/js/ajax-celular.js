document.addEventListener('DOMContentLoaded', () => {
    const celularForm = document.getElementById('celular-form');
    celularForm.addEventListener('submit', createcelular);
    fetchcelulars();

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const createcelular = (event) => {
    event.preventDefault();
    const marca = document.getElementById('marca').value, modelo = document.getElementById('modelo').value, anio = document.getElementById('anio').value;

    fetch('/api/celulars/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ marca, modelo, anio })
    })
        .then(() => {
            fetchcelulars();
        });
}

const fetchcelulars = () => {
    const celularList = document.getElementById('celular-list');

    fetch('/api/celulars')
        .then(response => response.json())
        .then(data => {
            celularList.innerHTML = '';

            data.forEach(celular => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper';

                const celularDetails = document.createElement('p');
                celularDetails.innerHTML = `${celular.marca} - ${celular.modelo} - ${celular.anio}`;
                celularDetails.className = 'col s12 m8';

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s6 m2';
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(celular));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s6 m2';
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => deletecelular(celular.id));

                li.appendChild(celularDetails);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                celularList.appendChild(li);
            });

        });
}

const openEditModal = (celular) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-celular-modal'));
    document.getElementById('edit-id').value = celular.id;
    document.getElementById('edit-marca').value = celular.marca;
    document.getElementById('edit-modelo').value = celular.modelo;
    document.getElementById('edit-anio').value = celular.anio;
    M.updateTextFields();
    modal.open();
}

const editcelular = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const marca = document.getElementById('edit-marca').value, modelo = document.getElementById('edit-modelo').value, anio = document.getElementById('edit-anio').value;

    fetch(`/api/celulars/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ marca, modelo, anio })
    })
        .then(() => {
            fetchcelulars();
            const modal = M.Modal.getInstance(document.getElementById('edit-celular-modal'));
            modal.close();
        });
}

document.getElementById('edit-celular-form').addEventListener('submit', editcelular);

const deletecelular = async (id) => {
    await fetch(`/api/celulars/${id}`, {
        method: 'DELETE'
    });

    fetchcelulars();
}
