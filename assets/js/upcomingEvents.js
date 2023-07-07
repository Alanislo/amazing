let contenedorTarjetas = document.getElementById("contenedor")
let datosEvents = data.events
let date = data.currentDate;

function crearMaqueta(object) {
    return ` <div class=" card-mob col p-3 d-flex justify-content-center ">
    <div class="card">
      <img src="${object.image}" class=" image-card card-img-top food" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center mb-3">${object.name}</h6>
        <h6 class="card-text text-center">${object.description}</h6>
        <div class="d-flex flex-row justify-content-between align-items-center price-details">
          <p>Price:${object.price}</p> 
            <a class="boton" href="./assets/pages/details1.html">Details</a>
        </div>
      </div>
    </div>
  </div>`
}

function imprimirMaqueta(events, date) {
    for (let evento of events) {
        if (evento.date >= date) {
            contenedorTarjetas.innerHTML += crearMaqueta(evento)
        }
    }
}

imprimirMaqueta(datosEvents, date)
