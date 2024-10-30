document.addEventListener('DOMContentLoaded', () => {
    const empleadoForm = document.getElementById('empleado-form');
    empleadoForm.addEventListener('submit', createempleado);
    fetchempleados();

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const createempleado = (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;

    fetch('/api/empleados/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })
        .then(response => {
            if (response.ok) {
                M.toast({html: 'Empleado creado con éxito', classes: 'green'});
                fetchempleados();
            } else {
                throw new Error('Error al crear el empleado');
            }
        })
        .catch(error => {
            M.toast({html: error.message, classes: 'red'});
        });
}

const fetchempleados = () => {
    const empleadoList = document.getElementById('empleado-list');

    fetch('/api/empleados')
        .then(response => response.json())
        .then(data => {
            empleadoList.innerHTML = '';

            data.forEach(empleado => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper'; // Materialize class for list item

                const empleadoDetails = document.createElement('p');
                empleadoDetails.innerHTML = `${empleado.nombre}`;
                empleadoDetails.className = 'col s12 m8'; // Materialize class for column

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s6 m2'; // Materialize class for blue button
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(empleado));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s6 m2'; // Materialize class for red button
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => openConfirmDeleteModal(empleado.id));

                li.appendChild(empleadoDetails);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                empleadoList.appendChild(li);
            });

        });
}

const openEditModal = (empleado) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-empleado-modal'));
    document.getElementById('edit-id').value = empleado.id;
    document.getElementById('edit-nombre').value = empleado.nombre;
    M.updateTextFields();
    modal.open();
}

const editempleado = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const nombre = document.getElementById('edit-nombre').value;

    fetch(`/api/empleados/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })
        .then(response => {
            if (response.ok) {
                M.toast({html: 'Empleado actualizado con éxito', classes: 'green'});
                fetchempleados();
                const modal = M.Modal.getInstance(document.getElementById('edit-empleado-modal'));
                modal.close();
            } else {
                throw new Error('Error al actualizar el empleado');
            }
        })
        .catch(error => {
            M.toast({html: error.message, classes: 'red'});
        });
}

const openConfirmDeleteModal = (id) => {
    const modal = M.Modal.getInstance(document.getElementById('confirm-delete-modal'));
    document.getElementById('confirm-delete-btn').onclick = () => deleteempleado(id);
    modal.open();
}

const deleteempleado = async (id) => {
    try {
        const response = await fetch(`/api/empleados/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({html: 'Empleado eliminado con éxito', classes: 'green'});
            fetchempleados();
        } else {
            throw new Error('Error al eliminar el empleado');
        }
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

document.getElementById('edit-empleado-form').addEventListener('submit', editempleado);
