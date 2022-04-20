const ingresos = [
    new Ingreso('Salario', 2100),
    new Ingreso('Venta coche', 1500.00)
];

const egresos = [
    new Egreso('Renta departamento', 900.00),
    new Egreso('Ropa', 400.00)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    let modal = document.getElementById('myModal');
    let buttonCancelar = document.getElementsByClassName('cancelar')[0];
    let buttonEliminar = document.getElementsByClassName("eliminar")[0];

    modal.style.display = "block";

    buttonCancelar.onclick = function() {
        modal.style.display = "none";
    }    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    buttonEliminar.onclick = function() {
        ingresos.splice(indiceEliminar, 1);
        modal.style.display = "none";
        cargarCabecero();
        cargarIngresos();
    }
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);   

    // Recuperar el modal
    let modal = document.getElementById("myModal");

    // Recuperar los botones para cerrar el modal y eliminar el registro
    let buttonCancelar = document.getElementsByClassName("cancelar")[0];
    let buttonEliminar = document.getElementsByClassName("eliminar")[0];

    //Mostrar el modal
    modal.style.display = "block";

    // Cerrar el modal cuando el usuario selecciona el boton cancelar o si cliquea fuera del modal
    buttonCancelar.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }    
    
    //Eliminar registro al dar click en el boton eliminar
    buttonEliminar.onclick = function() {       
        egresos.splice(indiceEliminar, 1);
        modal.style.display = "none";
        cargarCabecero();
        cargarEgresos();
    }
    
}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            /*ingresos.push(new Ingreso(descripcion.value, Number(valor.value))); 
            SE SIMPLIFICA EL CONVERTIR DE STRING A NUMBER, PONIENDO UN + antes del elemento a convertir*/
            cargarCabecero();
            cargarIngresos();
            cleanInputs()
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
            cleanInputs()
        }
    }
}

function cleanInputs(){
    descripcion.value = '';
    valor.value = '';
}
