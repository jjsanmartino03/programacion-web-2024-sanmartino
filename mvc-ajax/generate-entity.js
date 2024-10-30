// generate-entity.js
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateFiles = async () => {
    const {entityName, fields, singularName, pluralName} = await inquirer.prompt([
        {
            type: 'input',
            name: 'entityName',
            message: 'Enter the entity name:',
        },
        {
            type: 'input',
            name: 'fields',
            message: 'Enter the fields (format: name:type, separated by commas):',
        },
        {
            type: 'input',
            name: 'singularName',
            message: 'Enter the singular name in Spanish:',
        },
        {
            type: 'input',
            name: 'pluralName',
            message: 'Enter the plural name in Spanish:',
        },
    ]);

    const fieldsArray = fields.split(',').map(field => {
        const [name, type] = field.split(':');
        return {name, type};
    });

    const modelContent = generateModel(entityName, fieldsArray);
    const controllerContent = generateController(entityName, fieldsArray);
    const routesContent = generateRoutes(entityName);
    const htmlContent = generateHTML(entityName, fieldsArray, singularName, pluralName);
    const jsContent = generateJS(entityName, fieldsArray, singularName, pluralName);

    const basePath = path.join(__dirname,);
    const modelPath = path.join(basePath, 'models', `${entityName}.js`);
    const controllerPath = path.join(basePath, 'controllers', `${entityName}-controller.js`);
    const routesPath = path.join(basePath, 'routes', `${entityName}.js`);
    const htmlPath = path.join(basePath, 'views', `${entityName}.html`);
    const jsPath = path.join(basePath, 'public', 'js', `ajax-${entityName}.js`);

    fs.writeFileSync(modelPath, modelContent);
    fs.writeFileSync(controllerPath, controllerContent);
    fs.writeFileSync(routesPath, routesContent);
    fs.writeFileSync(htmlPath, htmlContent);
    fs.writeFileSync(jsPath, jsContent);

    console.log('Files generated successfully!');
};

const generateModel = (entityName, fields) => {
    const fieldsString = fields.map(field => {
        return `${field.name}: {
            type: DataTypes.${field.type.toUpperCase()},
            allowNull: false
        }`;
    }).join(',\n    ');

    return `import database from '../config/database.js'
import { DataTypes } from "sequelize";

const ${entityName} = database.define('${entityName}', {
    ${fieldsString},
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

export default ${entityName};
`
};

const generateController = (entityName, fields) => {
    const fieldsString = fields.map(field => field.name).join(', ');

    return `import ${entityName} from "../models/${entityName}.js";

// Obtener todos los ${entityName}s
export const get${entityName}s = async (req, res) => {
    try {
        const ${entityName.toLowerCase()}s = await ${entityName}.findAll();
        res.json(${entityName.toLowerCase()}s);
    } catch (error) {
        res.status(500).send('Error al obtener los ${entityName.toLowerCase()}s');
    }
};

// Crear nuevo ${entityName}
export const create${entityName} = async (req, res) => {
    try {
        const { ${fieldsString} } = req.body;
        await ${entityName}.create({ ${fieldsString} });
        res.status(201).json({ message: '${entityName} creado' });
    } catch (error) {
        res.status(500).send('Error al crear el ${entityName.toLowerCase()}');
    }
};

export const delete${entityName} = async (req, res) => {
    try {
        const { id } = req.params;
        await ${entityName}.destroy({ where: { id } });
        res.json({ message: '${entityName} eliminado' });
    } catch (error) {
        res.status(500).send('Error al eliminar el ${entityName.toLowerCase()}');
    }
}

export const update${entityName} = async (req, res) => {
    try {
        const { id } = req.params;
        const { ${fieldsString} } = req.body;
        await ${entityName}.update({ ${fieldsString} }, { where: { id } });
        res.json({ message: '${entityName} actualizado' });
    } catch (error) {
        res.status(500).send('Error al actualizar el ${entityName.toLowerCase()}');
    }
}
`
}

const generateRoutes = (entityName) => {
    return `import express from "express";
import { get${entityName}s, create${entityName}, delete${entityName}, update${entityName} } from '../controllers/${entityName}-controller.js';

const router = express.Router();

// Rutas
router.get('/', get${entityName}s);
router.post('/add', create${entityName});
router.delete('/:id', delete${entityName});
router.put('/:id', update${entityName});

export default router;
`
};

const generateHTML = (entityName, fields, singularName, pluralName) => {
    const formFields = fields.map(field => {
        return `<div class="input-field">
            <input type="${field.type === 'number' ? 'number' : 'text'}" id="${field.name}" required>
            <label for="${field.name}">${field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
        </div>`;
    }).join('\n        ');

    const editFormFields = fields.map(field => {
        return `<div class="input-field">
            <input type="${field.type === 'number' ? 'number' : 'text'}" id="edit-${field.name}" required>
            <label for="edit-${field.name}">${field.name.charAt(0).toUpperCase() + field.name.slice(1)}</label>
        </div>`;
    }).join('\n            ');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Importando Materialize CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" rel="stylesheet">
    <title>${pluralName}</title>
</head>
<body>

<!-- Include the navbar -->
<div id="navbar"></div>

<div class="container">
    <h2>Lista de ${pluralName}</h2>
    <ul id="${entityName.toLowerCase()}-list" class="collection"></ul>

    <form id="${entityName.toLowerCase()}-form">
        ${formFields}
        <button type="submit" class="btn">Añadir ${singularName}</button>
    </form>
</div>

<div id="edit-${entityName.toLowerCase()}-modal" class="modal">
    <div class="modal-content">
        <h4>Editar ${singularName}</h4>
        <form id="edit-${entityName.toLowerCase()}-form">
            <input type="hidden" id="edit-id">
            ${editFormFields}
            <button type="submit" class="btn">Guardar Cambios</button>
        </form>
    </div>
    <div class="modal-footer">
        <button class="modal-close btn red">Cancelar</button>
    </div>
</div>

<!-- Confirmation Modal -->
<div id="confirm-delete-modal" class="modal">
    <div class="modal-content">
        <h4>Confirmar Eliminación</h4>
        <p>¿Estás seguro de que deseas eliminar este ${singularName.toLowerCase()}?</p>
    </div>
    <div class="modal-footer">
        <button id="confirm-delete-btn" class="btn red">Eliminar</button>
        <button class="modal-close btn">Cancelar</button>
    </div>
</div>

<script src="/js/ajax-${entityName.toLowerCase()}.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
    // Load the navbar
    fetch('/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });
</script>
</body>
</html>
`
};

const generateJS = (entityName, fields, singularName, pluralName) => {
    const fieldsString = fields.map(field => field.name).join(', ');

    return `document.addEventListener('DOMContentLoaded', () => {
    const ${entityName.toLowerCase()}Form = document.getElementById('${entityName.toLowerCase()}-form');
    ${entityName.toLowerCase()}Form.addEventListener('submit', create${entityName});
    fetch${entityName}s();

    const modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

const create${entityName} = (event) => {
    event.preventDefault();
    const ${fields.map(field => `${field.name} = document.getElementById('${field.name}').value`).join(', ')};

    fetch('/api/${entityName.toLowerCase()}s/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ${fieldsString} })
    })
        .then(response => {
            if (response.ok) {
                M.toast({html: '${singularName} creado con éxito', classes: 'green'});
                fetch${entityName}s();
            } else {
                throw new Error('Error al crear el ${singularName.toLowerCase()}');
            }
        })
        .catch(error => {
            M.toast({html: error.message, classes: 'red'});
        });
}

const fetch${entityName}s = () => {
    const ${entityName.toLowerCase()}List = document.getElementById('${entityName.toLowerCase()}-list');

    fetch('/api/${entityName.toLowerCase()}s')
        .then(response => response.json())
        .then(data => {
            ${entityName.toLowerCase()}List.innerHTML = '';

            data.forEach(${entityName.toLowerCase()} => {
                const li = document.createElement('li');
                li.className = 'collection-item row valign-wrapper'; // Materialize class for list item

                const ${entityName.toLowerCase()}Details = document.createElement('p');
                ${entityName.toLowerCase()}Details.innerHTML = \`${fields.map(field => `\${${entityName.toLowerCase()}.${field.name}}`).join(' - ')}\`;
                ${entityName.toLowerCase()}Details.className = 'col s12 m8'; // Materialize class for column

                const editButton = document.createElement('button');
                editButton.className = 'btn blue col s6 m2'; // Materialize class for blue button
                editButton.innerText = 'Editar';
                editButton.addEventListener('click', () => openEditModal(${entityName.toLowerCase()}));

                const deleteButton = document.createElement('button');
                deleteButton.className = 'btn red col s6 m2'; // Materialize class for red button
                deleteButton.innerText = 'Eliminar';
                deleteButton.addEventListener('click', () => openConfirmDeleteModal(${entityName.toLowerCase()}.id));

                li.appendChild(${entityName.toLowerCase()}Details);
                li.appendChild(editButton);
                li.appendChild(deleteButton);
                ${entityName.toLowerCase()}List.appendChild(li);
            });

        });
}

const openEditModal = (${entityName.toLowerCase()}) => {
    const modal = M.Modal.getInstance(document.getElementById('edit-${entityName.toLowerCase()}-modal'));
    document.getElementById('edit-id').value = ${entityName.toLowerCase()}.id;
    ${fields.map(field => `document.getElementById('edit-${field.name}').value = ${entityName.toLowerCase()}.${field.name}`).join(';\n    ')};
    M.updateTextFields();
    modal.open();
}

const edit${entityName} = (event) => {
    event.preventDefault();
    const id = document.getElementById('edit-id').value;
    const ${fields.map(field => `${field.name} = document.getElementById('edit-${field.name}').value`).join(', ')};

    fetch(\`/api/${entityName.toLowerCase()}s/\${id}\`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ${fieldsString} })
    })
        .then(response => {
            if (response.ok) {
                M.toast({html: '${singularName} actualizado con éxito', classes: 'green'});
                fetch${entityName}s();
                const modal = M.Modal.getInstance(document.getElementById('edit-${entityName.toLowerCase()}-modal'));
                modal.close();
            } else {
                throw new Error('Error al actualizar el ${singularName.toLowerCase()}');
            }
        })
        .catch(error => {
            M.toast({html: error.message, classes: 'red'});
        });
}

const openConfirmDeleteModal = (id) => {
    const modal = M.Modal.getInstance(document.getElementById('confirm-delete-modal'));
    document.getElementById('confirm-delete-btn').onclick = () => delete${entityName}(id);
    modal.open();
}

const delete${entityName} = async (id) => {
    try {
        const response = await fetch(\`/api/${entityName.toLowerCase()}s/\${id}\`, {
            method: 'DELETE'
        });

        if (response.ok) {
            M.toast({html: '${singularName} eliminado con éxito', classes: 'green'});
            fetch${entityName}s();
        } else {
            throw new Error('Error al eliminar el ${singularName.toLowerCase()}');
        }
    } catch (error) {
        M.toast({html: error.message, classes: 'red'});
    }
}

document.getElementById('edit-${entityName.toLowerCase()}-form').addEventListener('submit', edit${entityName});
`
};

generateFiles();