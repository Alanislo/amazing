let contenedorTarjetas = document.getElementById("contenedor")
let datosEvents = data.events
function crearMaqueta(object){
    return ` <div class=" card-mob p-3 col d-flex justify-content-center ">
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

function imprimirMaqueta(events) {
    for ( let evento of events){
        contenedorTarjetas.innerHTML += crearMaqueta(evento)
    }
}

imprimirMaqueta(datosEvents)