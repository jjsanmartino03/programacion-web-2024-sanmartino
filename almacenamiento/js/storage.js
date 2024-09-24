function iniciar() {
    let boton = document.getElementById("grabar");
    boton.addEventListener('click', grabarNuevoItem);
    mostrarInformacion()
}

function grabarNuevoItem() {
    let claveElem = document.getElementById("clave");
    let valorElem = document.getElementById("texto");

    sessionStorage.setItem(claveElem.value, valorElem.value);
    mostrarInformacion(claveElem.value);
    claveElem.value = "";
    valorElem.value = "";
}

function oldMostrarInformacion(clave) {
    let cajadatos = document.getElementById("cajadatos");
    let valor = sessionStorage.getItem(clave);
    cajadatos.innerHTML = '<div>' + clave + '-' + valor + '</div>';
    let claveElem = document.getElementById('clave');
    claveElem.innerHTML = "";

    let textoElem = document.getElementById("texto");
    textoElem.innerHTML = "";
}

function mostrarInformacion(){
    let cajadatos = document.getElementById('cajadatos');
    cajadatos.innerHTML = '';

    if (sessionStorage.length) {
        cajadatos.innerHTML = '<div><input type="button" value="Eliminar todo" onclick="eliminarTodo()"></div>';
    }

    for (let i = 0;i<sessionStorage.length;i++){
        let clave = sessionStorage.key(i);
        let valor = sessionStorage.getItem(clave);
        cajadatos.innerHTML += '<div>' + clave + '-' + valor + '<br><input type="button" onclick="eliminar(' +
            '\''+clave + '\')" value="Eliminar"></div>';
    }
}

function eliminar(clave){
    if(confirm('seguro desea eliminar?')){
        sessionStorage.removeItem(clave);
    }
    mostrarInformacion()
}

function eliminarTodo() {
    if (confirm('seguro desea eliminar todo?')){
        sessionStorage.clear()
    }
    mostrarInformacion()
}

addEventListener('load', iniciar)