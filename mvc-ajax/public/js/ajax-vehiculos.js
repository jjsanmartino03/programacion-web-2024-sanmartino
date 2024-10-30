document.addEventListener('DOMContentLoaded', () => {
    const vehiculosForm = document.getElementById('vehiculos-form');
    vehiculosForm.addEventListener('submit', createvehiculos);
    fetchvehiculos();

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const createvehiculos = (event) => {
    event.preventDefault();
    const tipo = document.getElementById('tipo').value, anio = document.getElementById('anio').value, patente = document.getElementById('patente').value, colo = document.getElementById('colo').value;

    fetch('/api/vehiculos/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo, anio, patente, colo })
    })
        .then(() => {
            fetchvehiculos();
        });
}

const fetchvehiculos = () => {
    const vehiculosList = document.getElementById('vehiculos-list');

    fetch('/api/vehiculos')
        .then(response => response.json())
        .then(data => {
            vehiculosList.innerHTML = '';

            data.forEach(vehiculos => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper';

                const vehiculosDetails = document.createElement('p');
                vehiculosDetails.innerHTML = `${vehiculos.tipo} - ${vehiculos.anio} - ${vehiculos.patente} - ${vehiculos.colo}`;
                vehiculosDetails.className = 'col s12 m8';

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s6 m2';
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(vehiculos));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s6 m2';
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => deletevehiculos(vehiculos.id));

                li.appendChild(vehiculosDetails);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                vehiculosList.appendChild(li);
            });

        });
}

const openEditModal = (vehiculos) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-vehiculos-modal'));
    document.getElementById('edit-id').value = vehiculos.id;
    document.getElementById('edit-tipo').value = vehiculos.tipo;
    document.getElementById('edit-anio').value = vehiculos.anio;
    document.getElementById('edit-patente').value = vehiculos.patente;
    document.getElementById('edit-colo').value = vehiculos.colo;
    M.updateTextFields();
    modal.open();
}

const editvehiculos = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const tipo = document.getElementById('edit-tipo').value, anio = document.getElementById('edit-anio').value, patente = document.getElementById('edit-patente').value, colo = document.getElementById('edit-colo').value;

    fetch(`/api/vehiculos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tipo, anio, patente, colo })
    })
        .then(() => {
            fetchvehiculos();
            const modal = M.Modal.getInstance(document.getElementById('edit-vehiculos-modal'));
            modal.close();
        });
}

document.getElementById('edit-vehiculos-form').addEventListener('submit', editvehiculos);

const deletevehiculos = async (id) => {
    await fetch(`/api/vehiculos/${id}`, {
        method: 'DELETE'
    });

    fetchvehiculos();
}
