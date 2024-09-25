const addPersona = (e) => {
    console.log(e);
    e.preventDefault()

    const fields = ['nombre', 'apellido', 'direccion', 'apellido', 'codpostal']

    const dniElem = document.getElementById('dni')
    const dni = dniElem.value
    dniElem.value = ''

    let result = '';
    for (let field of fields) {
        const fieldElem = document.getElementById(field)
        const fieldVal = fieldElem.value
        result += fieldVal + ','

        fieldElem.value = ''
    }
    result = result.slice(0, -1)

    sessionStorage.setItem(dni, result)
    renderPersona()
}

const renderPersona = () => {
    const personasListContainer = document.getElementById('personas-list')
    personasListContainer.innerHTML = ''
    const clearAllBtn = document.getElementById('clear-all')
    if (sessionStorage.length < 2) {
        clearAllBtn.classList.add('display-none')
    } else {
        clearAllBtn.classList.remove('display-none')
    }

    for (let i = 0; i < sessionStorage.length; i++) {
        let clave = sessionStorage.key(i);
        let valor = sessionStorage.getItem(clave);
        personasListContainer.innerHTML += `<li class="valign-wrapper collection-item row">
<span class="col s4">${clave}</span>
<span class="col s4">${valor}</span>
<button class="btn waves-effect waves-light red" onclick="deletePersona('${clave}')">Eliminar</button>
            </li>
        `;

    }

}

const deletePersona = (dni) => {
    if (confirm('Seguro desea eliminar?')) {
        sessionStorage.removeItem(dni)
    }
    renderPersona()
}

const deleteAll = () => {
    if (confirm('Seguro desea eliminar todo?')) {
        sessionStorage.clear()
    }
    renderPersona()
}

addEventListener('load', () => {
    const addPersonaElem = document.getElementById('form')
    addPersonaElem.addEventListener('submit', addPersona)
    const clearAllElem = document.getElementById('clear-all');
    clearAllElem.addEventListener('click', deleteAll)
    renderPersona()
})