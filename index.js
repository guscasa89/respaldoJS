let btnLista;
let btnAlta;
let btnCons;
let btnBaja;
let btnMod;
let formulario;




function inicializarElementos() {
    btnLista = document.getElementById("btnlista");
    btnAlta = document.getElementById("btnalta");
    btnCons = document.getElementById("btncons");
    btnBaja = document.getElementById("btnbaja");
    btnMod = document.getElementById("btnmod");

}








class Menu {
    constructor(nombre, precio, peso, gluten, coccion) {
        this.nombre = nombre;
        this.precio = precio;
        this.peso = peso;
        this.gluten = gluten;
        this.coccion = coccion;
    }

    darGluten() {
        let glut = "NO"
        if (this.gluten)
            glut = "SI"

        return glut
    }


    // 0: no especifica 1:HORNO 2: MICROONDAS
    darCoccion() {
        let coc = "No se especifica coccion."
        if (this.coccion == 1)
            coc = "Precisa horno/sarten."
        else
            coc = "Precisa microondas."

        return coc;
    }


    imprimirMenu() {
        let glutenStr = this.darGluten()
        let coccionStr = this.darCoccion()
        let cadena = "Nombre: " + this.nombre + " Precio: " + this.precio + " Peso: " + this.peso + " Gluten: " + glutenStr + " Coccion: " + coccionStr
        return cadena
    }


}

class MenuPedido {
    constructor(nombre, cantidad) {
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    imprimirMenuPedido() {
        let cadena = "Menu: " + this.nombre + " Cantidad: " + this.cantidad;
        return cadena
    }



}





//variables globales
let menu;
const menues = [];
menues.push(new Menu("Sorrentinos", 200, 350, true, 1))
menues.push(new Menu("Cazuela", 200, 300, false, 2))
menues.push(new Menu("Pollo Arollado", 220, 350, false, 2))
menues.push(new Menu("Milanesa", 180, 200, true, 1))
menues.push(new Menu("Tarta", 160, 250, true, 1))
menues.push(new Menu("Bondiola", 250, 350, false, 1))

const menuesPedidos = [];

const pedidos = [];

function limpiarDiv() {
    //obtengo el div existente y borro el contenido
    let divPrincipal = document.getElementById("principal");
    divPrincipal.remove();

    //obtengo el contenedor del div anterior
    let divContenedor = document.getElementById("contenedor")

    //genero el nuevo div principal
    let nuevoPrincipal = document.createElement("div");
    nuevoPrincipal.id = "principal";
    nuevoPrincipal.className = "col-3 order-0 text-white bg-success";

    //lo agrego al contenedor
    divContenedor.append(nuevoPrincipal);

    return nuevoPrincipal;
}

function limpiarDivMensajes() {
    let divPrincipal = document.getElementById("container-alta");
    divPrincipal.remove();

    //obtengo el contenedor del div anterior
    let divContenedor = document.getElementById("contenedor")

    //genero el nuevo div principal
    let nuevoPrincipal = document.createElement("div");
    nuevoPrincipal.id = "container-alta";
    nuevoPrincipal.className = "col-3 order-1 text-white bg-success";

    //lo agrego al contenedor
    divContenedor.append(nuevoPrincipal);

    return nuevoPrincipal;
}


//funciones
function listarMenues() {

    /*
    <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
        <div class="card-header">Header</div>
        <div class="card-body">
            <h4 class="card-title">Primary card title</h4>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
    </div>
    */

    let divNuevoPrincipal = limpiarDiv()

    menues.forEach((menu) => {

        //creo el div para los menues
        let divMenues = document.createElement("div")
        divMenues.className = "col-2 card text-white bg-primary mb-3"
        divMenues.style = "width: 20rem; margin: 10px; border-radius: 20px;"
        divMenues.innerHTML = `<div class=\"card-header\">Menu ${menu.nombre}</div><div class=\"card-body\"><p class=\"card-text\">${menu.imprimirMenu()}</p></div>`



        //al div principal le agrego el div de menues
        divNuevoPrincipal.append(divMenues);


    })


    /*
    let cadena = "";
    menues.forEach((menu) => {

        cadena = cadena + menu.imprimirMenu() + '\n';

    })

    return cadena;
    */
}

function listarMenuesPedidos() {
    /*
    let cadena = "";
    for(const menu of menuesPedidos)
        cadena = cadena + menu.imprimirMenuPedido() + '\n';

    return cadena;
    */
    let cadena = "";
    menuesPedidos.forEach((menu) => {

        cadena = cadena + menu.imprimirMenuPedido() + '\n';

    })

    return cadena;
}

function darCostoTotal(arrayPedidos) {
    let costo = 0;
    arrayPedidos.forEach((menu) => {

        switch (menu.nombre) {
            case 'Sorrentinos':
                costo = costo + menu.cantidad * 200;
                break;
            case 'Cazuela':
                costo = costo + menu.cantidad * 200;
                break;
            case 'Pollo Arollado':
                costo = costo + menu.cantidad * 220;
                break;
            case 'Milanesa':
                costo = costo + menu.cantidad * 180;
                break;
            case 'Tarta':
                costo = costo + menu.cantidad * 160;
                break;
            case 'Bondiola':
                costo = costo + menu.cantidad * 250;
                break;
            default:
                break;

        }

    })

    return costo;
}

class Pedido {
    constructor(id, cliente, menues, direccion, telefono, costo) {
        this.id = id;
        this.cliente = cliente;
        this.menues = menues;
        this.direccion = direccion;
        this.telefono = telefono;
        this.costo = costo;
    }

    imprimirPedido() {
        let cadena = "Numero de pedido : " + this.id + "\nCliente: " + this.cliente + "\nDireccion: " + this.direccion + "\nTelefono: " + this.telefono + "\nMenues pedidos: \n" + listarMenuesPedidos() + "\n costo total: " + this.costo
        return cadena
    }

    borrarMenuesPedidos() {
        this.menues.splice(0, 6);
    }
}

function selectMenues() {

    let slcMenu1 = document.getElementById("slcMenu1");
    let slcMenu2 = document.getElementById("slcMenu2");
    let slcMenu3 = document.getElementById("slcMenu3");
    let slcMenu4 = document.getElementById("slcMenu4");
    let slcMenu5 = document.getElementById("slcMenu5");
    let slcMenu6 = document.getElementById("slcMenu6");

    const selecteds = [];

    selecteds.push(slcMenu1);
    selecteds.push(slcMenu2);
    selecteds.push(slcMenu3);
    selecteds.push(slcMenu4);
    selecteds.push(slcMenu5);
    selecteds.push(slcMenu6);



    //alert("A contuinuación seleccione la cantidad de viandas a pedir:")
    const CANT = ""

    menuesPedidos.splice(0, 6);

    var cantidad;
    cantidad = parseInt(selecteds[0].options[selecteds[0].selectedIndex].value);
    menuesPedidos.push(new MenuPedido(menues[0].nombre, cantidad))
    cantidad = parseInt(selecteds[1].options[selecteds[1].selectedIndex].value);
    menuesPedidos.push(new MenuPedido(menues[1].nombre, cantidad))
    cantidad = parseInt(selecteds[2].options[selecteds[2].selectedIndex].value);
    menuesPedidos.push(new MenuPedido(menues[2].nombre, cantidad))
    cantidad = parseInt(selecteds[3].options[selecteds[3].selectedIndex].value);
    menuesPedidos.push(new MenuPedido(menues[3].nombre, cantidad))
    cantidad = parseInt(selecteds[4].options[selecteds[4].selectedIndex].value);
    menuesPedidos.push(new MenuPedido(menues[4].nombre, cantidad))
    cantidad = parseInt(selecteds[5].options[selecteds[5].selectedIndex].value);
    menuesPedidos.push(new MenuPedido(menues[5].nombre, cantidad))

/* **No me funcionó**

    var i = 0;
    //cantidades: [0] Sorrentinos [1] Cazuela [2] Pollo arrollado [3] Milanesa [4] Tarta [5] Bondiola
    menues.forEach((menu) => {

        var cantidad = parseInt(selecteds[i].options[selecteds[i].selectedIndex].value);
        menuesPedidos.push(new MenuPedido(menu.nombre, cantidad))

        i++;
    })
*/

    return menuesPedidos;


}





function estaPedido(nroPedido) {
    /*
    var i = 0;
    var esta = false;
    while(i < pedidos.length && esta == false)
    {
        if(pedidos[i].id == nroPedido)
            esta = true;
         i++;
    }

    return esta;
    */

    return (pedidos.some((pedido) => pedido.id == nroPedido))
}

//Precondicion: existe pedido
function darPedido(nroPedido) {
    /*
    var pedido = null;
    var i = 0;
    while(i < pedidos.length && pedido == null)
    {
        if(pedidos[i].id == nroPedido)
            pedido = new Pedido(pedidos[i].id, pedidos[i].cliente, pedidos[i].menues, pedidos[i].direccion, pedidos[i].telefono);
         i++;
    }

    return pedido;
    */

    return pedidos.find((pedido) => pedido.id == nroPedido)
}

function devolverPedido(nroPedido) {

    const pedido = darPedido(nroPedido)
    //alert(pedido.imprimirPedido());

    let nuevoPrincipal = limpiarDivMensajes();

    let divConsulta = document.createElement("div")
    divConsulta.className = "card text-white bg-danger mb-3"
    divConsulta.style = "width: 20rem; margin: 10px"
    divConsulta.innerHTML = `<div class="card-header">${pedido.id}</div><div class="card-body"><h4 class="card-title">Pedido del cliente ${pedido.cliente}</h4><p class="card-text">${pedido.imprimirPedido()}</p></div>`

    nuevoPrincipal.append(divConsulta)

}

function eliminarPedido(nroPedido) {
    let borrado = false;
    var i = 0;
    while (i < pedidos.length && borrado == false) {
        if (pedidos[i].id == nroPedido) {
            pedidos.splice(i, 1);
            borrado = true;
        }
        i++;
    }

}



function altaPedido() {

    let divNuevoPrincipal = limpiarDiv()

    let divForm = document.createElement("form");

    divForm.id = "formulario";

    divForm.style = "margin: 10px; border-radius: 20px;";

    divForm.innerHTML =
        `<fieldset>
    <legend>Resumen de tu pedido:</legend>

    <div class="form-group">
      <label class="col-form-label col-form-label-sm mt-4" for="iptNombre">Nombre Completo</label>
      <input class="form-control form-control-sm" type="text" placeholder="Nombre Apellido" id="iptNombre">

      <label class="col-form-label col-form-label-sm mt-4" for="iptTelefono">Telefono</label>
      <input class="form-control form-control-sm" type="text" placeholder="09xxxxxxx" id="iptTelefono">

      <label class="col-form-label col-form-label-sm mt-4" for="iptDireccion">Direccion</label>
      <input class="form-control form-control-sm" type="text" placeholder="xxxxxxxx 1111 apto xx"
        id="iptDireccion">

        <div class="form-group">
        <label for="slcMenu1" class="form-label mt-4">Menu Sorrentinos, cantidad:</label>
        <select class="form-select" id="slcMenu1">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu2" class="form-label mt-4">Menu Cazuela, cantidad:</label>
        <select class="form-select" id="slcMenu2">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu3" class="form-label mt-4">Menu Pollo Arrollado, cantidad:</label>
        <select class="form-select" id="slcMenu3">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu4" class="form-label mt-4">Menu Milanesa, cantidad:</label>
        <select class="form-select" id="slcMenu4">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu5" class="form-label mt-4">Menu Tarta, cantidad:</label>
        <select class="form-select" id="slcMenu5">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu6" class="form-label mt-4">Menu Bondiola, cantidad:</label>
        <select class="form-select" id="slcMenu6">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Confirmar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>

    </div>
    </fieldset>
    `;


    divNuevoPrincipal.append(divForm);



    formulario = document.getElementById("formulario");

    formulario.onsubmit = (event) => validarFormularioAlta(event);



}

function validarFormularioAlta(event) {
    event.preventDefault();


    let inputNombre = document.getElementById("iptNombre");
    let inputDireccion = document.getElementById("iptTelefono");
    let inputTelefono = document.getElementById("iptDireccion");



    const ID = Math.floor(Math.random() * 1000);

    const NOMBRE = inputNombre.value;
    const DIRECCION = inputDireccion.value;
    const TELEFONO = inputTelefono.value;

    const MENUESPEDIDOS = selectMenues();

    const COSTO = darCostoTotal(MENUESPEDIDOS);

    const pedido = new Pedido(ID, NOMBRE, MENUESPEDIDOS, DIRECCION, TELEFONO, COSTO);

    pedidos.push(pedido)

    //alert(pedido.imprimirPedido());

    let divMenues = document.getElementById("container-alta");


    menues.forEach((menu) => {

        divMenues.innerHTML = `<p style="color: #f2f2f2; font-size: 20px;">Pedido creado: ${pedido.imprimirPedido()}</p>`

        //document.body.append(divMenues)


    })

}

function modificarPedido() {


    let divNuevoPrincipal = limpiarDiv()

    let divForm = document.createElement("form");

    divForm.id = "formulario";

    divForm.style = "margin: 10px; border-radius: 20px;";


    let cadena = ``;
    if (pedidos.length > 0) {

        
        pedidos.forEach((pedido) => {
            cadena = cadena + `<option>${pedido.id}</option>`
        })


    }


    divForm.innerHTML =
    `<fieldset><div class="form-group"><label for="selectorPedidosMod" class="form-label mt-4">Seleccione pedido a modificar</label>
    <select multiple="" class="form-select" id="selectorPedidosMod">`+cadena+`</select></div>
    <button type="submit" class="btn btn-primary">Modificar</button>
    </fieldset>`
    
    divNuevoPrincipal.append(divForm);

    formulario = document.getElementById("formulario");

    formulario.onsubmit = (event) => validarFormularioSlcPedido(event);


    /*

    if (pedidos.length > 0) {

        const nrosPedidos = [];
        pedidos.forEach((pedido) => {
            nrosPedidos.push(pedido.id)
        })
        let cadena = nrosPedidos.join(" - ")


        

        var nro = prompt("Seleccione un nro de pedido: " + cadena);

        if (estaPedido(nro)) {
            const pedidoOriginal = darPedido(nro);
            let cadena = "Datos del pedido " + pedidoOriginal.id + " a nombre de " + pedidoOriginal.cliente;
            alert(cadena);
            const DIRECCION = prompt("Ingrese dirección de entrega: ");
            const TELEFONO = prompt("Ingrese un telefono de contacto: ");


            var id = pedidoOriginal.id;
            var cliente = pedidoOriginal.cliente

            eliminarPedido(pedidoOriginal.id);

            const MENUESPEDIDOS = selectMenues();

            const COSTO = darCostoTotal(MENUESPEDIDOS);

            const pedidoModificado = new Pedido(id, cliente, MENUESPEDIDOS, DIRECCION, TELEFONO, COSTO);

            pedidos.push(pedidoModificado);
            alert(pedidoModificado.imprimirPedido());

            let divMenues = document.getElementById("container-modif");
            menues.forEach((menu) => {

                divMenues.innerHTML = `<p style="color: #f2f2f2; font-size: 30px;">Pedido creado: ${pedidoModificado.imprimirPedido()}</p>`
                //document.body.append(divMenues)


            })


        } else {
            alert("El numero de pedido no es correcto!.")
        }
    } else {
        alert("No hay pedidos cargados.")
    }
    */


}

function validarFormularioSlcPedido(event) {
    event.preventDefault();

    //generar un nuevo formulario para modificacion....

    let slcPedido = document.getElementById("selectorPedidosMod");
    let nroPedido = parseInt(slcPedido.options[slcPedido.selectedIndex].value);


    let divNuevoPrincipal = limpiarDiv()

    let divForm = document.createElement("form");

    divForm.id = "formulario";

    divForm.style = "margin: 10px; border-radius: 20px;";


    

    divForm.innerHTML =
        `<fieldset>
    <legend>MOdificacion de pedido ${nroPedido}:</legend>

    <div class="form-group">
      <label class="col-form-label col-form-label-sm mt-4" for="iptNombre">Nombre Completo</label>
      <input class="form-control form-control-sm" type="text" placeholder="Nombre Apellido" id="iptNombre">

      <label class="col-form-label col-form-label-sm mt-4" for="iptTelefono">Telefono</label>
      <input class="form-control form-control-sm" type="text" placeholder="09xxxxxxx" id="iptTelefono">

      <label class="col-form-label col-form-label-sm mt-4" for="iptDireccion">Direccion</label>
      <input class="form-control form-control-sm" type="text" placeholder="xxxxxxxx 1111 apto xx"
        id="iptDireccion">

        <div class="form-group">
        <label for="slcMenu1" class="form-label mt-4">Menu Sorrentinos, cantidad:</label>
        <select class="form-select" id="slcMenu1">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu2" class="form-label mt-4">Menu Cazuela, cantidad:</label>
        <select class="form-select" id="slcMenu2">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu3" class="form-label mt-4">Menu Pollo Arrollado, cantidad:</label>
        <select class="form-select" id="slcMenu3">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu4" class="form-label mt-4">Menu Milanesa, cantidad:</label>
        <select class="form-select" id="slcMenu4">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu5" class="form-label mt-4">Menu Tarta, cantidad:</label>
        <select class="form-select" id="slcMenu5">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="form-group">
        <label for="slcMenu6" class="form-label mt-4">Menu Bondiola, cantidad:</label>
        <select class="form-select" id="slcMenu6">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        </select>
        </div>

        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Confirmar</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        </div>

    </div>
    </fieldset>
    `;


    divNuevoPrincipal.append(divForm);



    formulario = document.getElementById("formulario");

    formulario.onsubmit = (event) => validarFormularioMod(event,nroPedido);





}

function validarFormularioMod(event, nroPedido) {
    event.preventDefault();


    let inputNombre = document.getElementById("iptNombre");
    let inputDireccion = document.getElementById("iptTelefono");
    let inputTelefono = document.getElementById("iptDireccion");


    /*
    if (estaPedido(nro)) {
            const pedidoOriginal = darPedido(nro);
            let cadena = "Datos del pedido " + pedidoOriginal.id + " a nombre de " + pedidoOriginal.cliente;
            alert(cadena);
            const DIRECCION = prompt("Ingrese dirección de entrega: ");
            const TELEFONO = prompt("Ingrese un telefono de contacto: ");


            var id = pedidoOriginal.id;
            var cliente = pedidoOriginal.cliente

            eliminarPedido(pedidoOriginal.id);

            const MENUESPEDIDOS = selectMenues();

            const COSTO = darCostoTotal(MENUESPEDIDOS);

            const pedidoModificado = new Pedido(id, cliente, MENUESPEDIDOS, DIRECCION, TELEFONO, COSTO);

            pedidos.push(pedidoModificado);
            alert(pedidoModificado.imprimirPedido());

            let divMenues = document.getElementById("container-modif");
            menues.forEach((menu) => {

                divMenues.innerHTML = `<p style="color: #f2f2f2; font-size: 30px;">Pedido creado: ${pedidoModificado.imprimirPedido()}</p>`
                //document.body.append(divMenues)


            })
    */



    const ID = nroPedido;

    const pedidoOriginal = darPedido(nroPedido);
    eliminarPedido(pedidoOriginal.id);

    const NOMBRE = inputNombre.value;
    const DIRECCION = inputDireccion.value;
    const TELEFONO = inputTelefono.value;

    const MENUESPEDIDOS = selectMenues();

    const COSTO = darCostoTotal(MENUESPEDIDOS);

    const pedidoModificado = new Pedido(ID, NOMBRE, MENUESPEDIDOS, DIRECCION, TELEFONO, COSTO);

    pedidos.push(pedidoModificado)

    //alert(pedido.imprimirPedido());

    let divMenues = document.getElementById("container-alta");
    menues.forEach((menu) => {

        divMenues.innerHTML = `<p style="color: #f2f2f2; font-size: 20px;">Pedido Modificado: ${pedidoModificado.imprimirPedido()}</p>`
        //document.body.append(divMenues)


    })

}

function bajaPedido() {

    
    let divNuevoPrincipal = limpiarDiv()

    let divForm = document.createElement("form");

    divForm.id = "formulario";

    divForm.style = "margin: 10px; border-radius: 20px;";


    let cadena = ``;
    if (pedidos.length > 0) {

        
        pedidos.forEach((pedido) => {
            cadena = cadena + `<option>${pedido.id}</option>`
        })


    }


    divForm.innerHTML =
    `<fieldset><div class="form-group"><label for="selectorPedidosMod" class="form-label mt-4">Seleccione pedido a cancelar</label>
    <select multiple="" class="form-select" id="selectorPedidosMod">`+cadena+`</select></div>
    <button type="submit" class="btn btn-primary">Dar de baja</button>
    </fieldset>`
    
    divNuevoPrincipal.append(divForm);

    formulario = document.getElementById("formulario");

    formulario.onsubmit = (event) => validarFormularioBaja(event);
    


    /*

    if (pedidos.length > 0) {
        const nrosPedidos = [];
        pedidos.forEach((pedido) => {
            nrosPedidos.push(pedido.id)
        })
        let cadena = nrosPedidos.join(" - ")


        var nro = prompt("Seleccione un nro de pedido a eliminar: " + cadena);

        if (estaPedido(nro)) {
            eliminarPedido(nro);
            alert(`Pedido ${nro} eliminado`)

            let divPedidos = document.getElementById("container-baja");
            divPedidos.innerHTML = `<h2 style="color: yellow; font-size: 30px;">Pedido ${nro} ha sido eliminado.</h2>`


        } else {
            alert("El numero de pedido no es correcto!.")
        }
    } else {
        alert("No hay pedidos cargados.")
    }
    */


}


function validarFormularioBaja(event) {
    event.preventDefault();



    let slcPedido = document.getElementById("selectorPedidosMod");
    let nroPedido = parseInt(slcPedido.options[slcPedido.selectedIndex].value);

    eliminarPedido(nroPedido);

    //let divNuevoPrincipal = limpiarDiv()

    limpiarDiv()

    alert(`Se dio de baja el pedido ${nroPedido}. \nNo puedo mostrar alert de boostrap!`)

    let divAlert = document.createElement("div")
    divAlert.className = "alert alert-dismissible alert-danger"
    divAlert.innerHTML = `<button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    El pedido ${nroPedido}<strong>ha sido cancelado</strong>`;

    
    document.body.append(divAlert);


    


}

function consultarPedido() {

    let divNuevoPrincipal = limpiarDiv()

    let divForm = document.createElement("form");

    divForm.id = "formulario";

    divForm.style = "margin: 10px; border-radius: 20px;";


    let cadena = ``;
    if (pedidos.length > 0) {

        
        pedidos.forEach((pedido) => {
            cadena = cadena + `<option>${pedido.id}</option>`
        })


    }


    divForm.innerHTML =
    `<fieldset><div class="form-group"><label for="selectorPedidosMod" class="form-label mt-4">Seleccione pedido a modificar</label>
    <select multiple="" class="form-select" id="selectorPedidosMod">`+cadena+`</select></div>
    <button type="submit" class="btn btn-primary">Consultar</button>
    </fieldset>`
    
    divNuevoPrincipal.append(divForm);

    formulario = document.getElementById("formulario");

    formulario.onsubmit = (event) => validarFormularioConsPedido(event);
    



}

function validarFormularioConsPedido(event){

    event.preventDefault();

    //generar un nuevo formulario para modificacion....

    let slcPedido = document.getElementById("selectorPedidosMod");
    let nroPedido = parseInt(slcPedido.options[slcPedido.selectedIndex].value);



    devolverPedido(nroPedido);



}

/*
function agregarMenu(){
    const NOMBRE = prompt("Nombre del Menu:");
    const PRECIO = prompt("Precio del Menu:");
    const PESO = prompt("Peso del Menu:");
    const GLUTEN = false
    let glu = prompt("Tiene gluten (s/n)?:");
    if (glu.toLowerCase === 's')
        GLUTEN = true
    const COCCION = 0 // 0: no especifica 1:HORNO 2: MICROONDAS
    let opcion = prompt("Precisa horno/sarten o microondas (h/m)?:");
        if (opcion.toLowerCase === 'm')
            COCCION = 1
        else
        if(opcion.toLowerCase === 'h')
            COCCION = 2
    
    const menu = new Menu(NOMBRE,PRECIO,PESO,GLUTEN,COCCION)
    return menu
}



function mostrarMenuModificador(){
    const OPCION = prompt(
        "Elija el menu a modificar (1 al 5) \n1. Sorrentinos\n2. Cazuela \n3. Pollo arrollado\n4. Milanesao\n5. Atras\n"
    );
    return OPCION
}

function modificarMenu(){

    let opcionSeleccionada = parseInt(mostrarMenuModificador());
    let cadena = ""
    while (opcionSeleccionada != 5) {

        switch (opcionSeleccionada) {
            case 1:
                const menu1 = new Menu("Sorrentinos",200,350,true,1)
                const menuNuevo = menu1.modificarMenu()
                cadena = menuNuevo.imprimirMenu()
                alert(cadena)
                break;
            case 2:
                const menu2 = new Menu("Cazuela",200,300,false,2)
                menu2 = menu2.modificarMenu()
                cadena = menu2.imprimirMenu()
                alert(cadena)
                break;
            case 3:
                const menu3 = new Menu("Pollo Arollado",220,350,false,2)
                menu3 = menu3.modificarMenu()
                cadena = menu3.imprimirMenu()
                alert(cadena)
                break;
            case 4:
                const menu4 = new Menu("Milanesa",180,200,true,1)
                menu4 = menu4.modificarMenu()
                cadena = menu4.imprimirMenu()
                alert(cadena)
                break;
            default:
                alert("Opcion Incorrecta");
                break;
        }

        opcionSeleccionada = parseInt(mostrarMenuModificador());
    }

}


*/
function mostrarMenu() {
    const OPCION = prompt(
        "Bienvenido, seleccione una opción (1 al 5) \n1. Listar menues\n2. Realizar pedido\n3. Modificar pedido\n4. Cancelar pedido\n5. Consulta pedido\n6. Salir\n"
    );
    return OPCION;
}


function capturarEventos() {
    btnLista.onclick = () => {
        listarMenues()
    }

    btnAlta.onclick = () => {
        altaPedido();
    }

    btnMod.onclick = () => {
        modificarPedido();
    }

    btnBaja.onclick = () => {
        bajaPedido();
    }

    btnCons.onclick = () => {
        consultarPedido();
    }
}



function main() {

    inicializarElementos();
    capturarEventos();
    /*
    let opcionSeleccionada = parseInt(mostrarMenu());

    while (opcionSeleccionada != 6) {

        switch (opcionSeleccionada) {
            case 1:
                listarMenues();
                break;
            case 2:
                altaPedido();
                break;
            case 3:
                modificarPedido();
                break;
            case 4:
                bajaPedido();
                break;
            case 5:
                consultarPedido();
                break;
            default:
                alert("Opcion Incorrecta");
                break;
        }

        opcionSeleccionada = parseInt(mostrarMenu());
    }
    */
}





main()