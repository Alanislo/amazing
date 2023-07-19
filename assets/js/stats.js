const contenedorCell1 = document.getElementById("mayor")
const contenedorCell2 = document.getElementById("menor")
const contenedorCell3 = document.getElementById("large")
const tablaPastEvents= document.getElementById("tabla-pastEvents")
const tablaUpcomingEvents= document.getElementById("tabla-upcomingEvents")


// Definimos los datos 
let date; 
let datosEvents;
// fetch 
fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(respuesta => respuesta.json())
    .then(data => {
        // asignamos valores a lasa variables, en este caso son los datos y las fechas 
         datosEvents = data.events
         date = data.currentDate

      // ordenamos por capacidad y retornamos aquel que tiene mas 
        const arrayOrdenado = Array.from(datosEvents).sort(function (a, b) {
            return b.capacity - a.capacity
        })
        
        // asignamos los valores que vamos a colocar en evento con mayor capacidad 
        let nombre = arrayOrdenado[0].name
        let capacidad = arrayOrdenado[0].capacity


        // creamos unas variables con los eventos filtrados por fecha 

        let eventosUpcom = datosEvents.filter(evento => evento.date >= date)
        console.log(eventosUpcom)
        let eventosPasados = datosEvents.filter(evento => evento.date < date)
        console.log(eventosPasados);
       

        // asignamos argumentos para calcular porcentajes de los eventos con mayor y menor capacidad
        eventosPasados.sort((a, b)=> calcularPorcentajeAlto( a.assistance, a.capacity ) - calcularPorcentajeAlto( b.assistance, b.capacity ))
        let eventoMenor = eventosPasados[0];
        let eventoMayor = eventosPasados[eventosPasados.length-1];
        let porcentaje1 = calcularPorcentajeAlto(eventoMayor.assistance, eventoMayor.capacity).toFixed(2)
        let porcentaje2 = calcularPorcentajeAlto(eventoMenor.assistance, eventoMenor.capacity)

        // imprimimos en las tablas 
        table1(eventoMayor,contenedorCell1,porcentaje1)
        table1(eventoMenor,contenedorCell2,porcentaje2)
        table2(nombre,contenedorCell3,capacidad)

        // pasamos a las categorias pasadas, donde creamos un array con categorias unicas pasadas 
        
        let categoriaPass = eventosPasados.map(evento => evento.category)
        let arrayPass = Array.from(new Set(categoriaPass))
        console.log(arrayPass);

        //creamos variables que luego le colocaremos valor 
        
        let asistenciaPromedio;
        let revenues;

        //Recorremos los eventos pasados y asignamos valor 0 a las ganancias y asistencia para que no se acumulen ni se pisen 
        arrayPass.forEach(categoriaPasado => {
            revenues =0;
            asistenciaPromedio=0;
        // filtramos por eventos en categorias calculamos las ganancias y la asistencia 
            let eventosPorCategoria = eventosPasados.filter(eventoPasado => eventoPasado.category == categoriaPasado)
            console.log(eventosPorCategoria);
            eventosPorCategoria.forEach(evento=>{
                revenues += evento.assistance * evento.price 
                asistenciaPromedio += calcularPorcentajeAlto(evento.assistance, evento.capacity)
                })
                revenues = revenues
                asistenciaPromedio = asistenciaPromedio / eventosPorCategoria.length

                console.log(categoriaPasado);
            crearFila3(categoriaPasado, asistenciaPromedio, revenues, tablaPastEvents)
        });

       

        let categoriaFuturo = eventosUpcom.map(evento => evento.category)
        let arrayUpcom = Array.from(new Set(categoriaFuturo))
        console.log(arrayUpcom);


        arrayUpcom.forEach(categoriaFuturo => {
            revenues =0;
            asistenciaPromedio=0;

            let eventosPorCategoriaFuturo = eventosUpcom.filter(eventoFuturo => eventoFuturo.category == categoriaFuturo)
            console.log(eventosPorCategoriaFuturo);
            eventosPorCategoriaFuturo.forEach(evento=>{
                revenues += evento.estimate * evento.price 
                asistenciaPromedio += calcularPorcentajeAlto(evento.estimate, evento.capacity)
                })
                revenues = revenues 
                asistenciaPromedio = asistenciaPromedio / eventosPorCategoriaFuturo.length

            crearFila3(categoriaFuturo, asistenciaPromedio, revenues, tablaUpcomingEvents)

        });
    }
    )
    .catch(error => console.log(error))

function calcularPorcentajeAlto(assistance, capacidad) {
    let porcentaje = (assistance / capacidad) * 100
    return porcentaje 
}
function table1(evento, elementoHtml, porcentaje) {
    elementoHtml.innerHTML=`
    <td>${evento.name} ${porcentaje} % </td>`
}
function table2(evento, elementoHtml, porcentaje) {
    elementoHtml.innerHTML=`
    <td>${evento} ${porcentaje} </td>`
}
function crearFila3(name, assistancePromedio, revenues, elementoHtml) {
    elementoHtml.innerHTML+=`
    <tr>
    <td>${name}</td>
    <td>$${revenues.toFixed(2)}</td>
    <td>${assistancePromedio.toFixed(2)}%</td>
    </tr>
    `
}
function crearFila3(name, assistancePromedio, revenues, elementoHtml) {
    elementoHtml.innerHTML+=`
    <tr>
    <td>${name}</td>
    <td>$${revenues.toFixed(2)}</td>
    <td>${assistancePromedio.toFixed(2)}%</td>
    </tr>
    `
}



