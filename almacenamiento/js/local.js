function iniciar(){
    var boton= document.getElementById("grabar");
    boton.addEventListener('click', nuevoItem);
    addEventListener('storage', mostrarCambios); /este evento me permite es que se actualice todo el tiempo para cuando lo abrimos en otra pestaña este actualizado/
    mostrar();
}


//Agregar datos

function nuevoItem(){
    var clave = document.getElementById("clave").value;
    var valor = document.getElementById("texto").value;
    localStorage.setItem(clave,valor);
    document.getElementById("clave").value ='';
    document.getElementById("texto").value ='';
    mostrar(clave);
}


//leer de a un registro
/*
function mostrar(clave){
	var cajadatos = document.getElementById("cajadatos");
	var valor = localStorage.getItem(clave);
	cajadatos.innerHTML = '<div>' + clave + '-' + valor + '</div>';
	var clave = document.getElementById('clave');
	var texto = document.getElementById('texto');
	texto.innerHTML ="";
}
*/

//leer todos los registros
/* */
function mostrar(){
    var cajadatos = document.getElementById("cajadatos");
    cajadatos.innerHTML='';
    if(localStorage.length > 0){
        cajadatos.innerHTML ='<div><input type="button" onclick="eliminarTodo()" value="eliminar Todo"</div>';
    }

    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var valor = localStorage.getItem(clave);
        cajadatos.innerHTML += '<div>' + clave + '-' + valor
            + '<br><input type="button" onclick="eliminar(\''+ clave + '\')" value="Eliminar"></div>';
    }
}


function eliminar(clave){
    if(confirm('Seguro desea eliminar?')){
        localStorage.removeItem(clave);
        mostrar();
    }
}

function eliminarTodo(){
    if(confirm('Seguro desea eliminar todo?')){
        localStorage.clear();
        mostrar();
    }
}
addEventListener('load', iniciar);

/*esta funcion recibe por parametro un evento del cual podemos mostrar,cual es el indice que se modifico
,el valor viejo,el nuevo valor,la url desde donde se hizo y el storagearea me va a dar un array para mostrar
todos los cambios que se hicieron.*/

function mostrarCambios(e){
    console.log(e.key);
    console.log(e.oldValue);
    console.log(e.newValue);
    console.log(e.url);
    console.log(e.storageArea);
    mostrar();
}