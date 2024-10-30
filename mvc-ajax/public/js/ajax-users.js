document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    userForm.addEventListener('submit', createUser);
    fetchUsers();

    // Initialize Materialize modal
    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const createUser = (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('/api/users/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
        .then(() => {
            fetchUsers();
        });
}

const fetchUsers = () => {
    const userList = document.getElementById('user-list');

    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = '';

            data.forEach(user => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper';

                const userDetails = document.createElement('p');
                userDetails.innerHTML = `${user.name} - ${user.email}`;
                userDetails.className = 'col s6';

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s3';
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(user));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s3';
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => deleteUser(user.id));

                li.appendChild(userDetails);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                userList.appendChild(li);
            });
        });
}

const openEditModal = (user) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-user-modal'));
    document.getElementById('edit-id').value = user.id;
    document.getElementById('edit-name').value = user.name;
    document.getElementById('edit-email').value = user.email;
    M.updateTextFields();
    modal.open();
}

const editUser = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const name = document.getElementById('edit-name').value;
    const email = document.getElementById('edit-email').value;

    fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
        .then(() => {
            fetchUsers();
            const modal = M.Modal.getInstance(document.getElementById('edit-user-modal'));
            modal.close();
        });
}

document.getElementById('edit-user-form').addEventListener('submit', editUser);

const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, {
        method: 'DELETE'
    });

    fetchUsers();
}