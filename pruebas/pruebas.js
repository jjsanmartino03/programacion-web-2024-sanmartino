let nombre = 'Julián'
console.log(nombre)
console.log(typeof (nombre));

let numero = 10
console.log(numero)
console.log(typeof (numero));

let arr = [25, 'hola', 21, true]
console.log(arr);
console.log(typeof (arr));
console.log(arr[2]);


let persona  = {
    nombre: 'Juan',
    edad: 30,
    "Mi pais": "Argentina",
    Saludar: function () {
        console.log('Hola mundo, ¿cómo estás?');
    }
}

console.log(persona);
console.log(persona.nombre);
console.log(persona.Saludar())
console.log(persona["Mi pais"]);

// alert(persona["nombre"])

console.log(eval("2+2"));

console.log(new Date());

console.log(Math.max(255,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));

console.log(document);
// clear console
console.clear()
console.log(window.location.href);

function saludar(tipo, nombre) {
    var tipo = tipo || 'Hola';
    var nombre = nombre || 'Julián';
    return tipo + " " + nombre;
}

alert(saludar('Hello', 'Juán'));

console.log(saludar('Helloooo', 'Juán'));
console.log(saludar());

var x1 = 1;
function f1() {
    var x1 = 10;
}
f1()
console.log(x1);