let datosEvents;
let containerDetails = document.getElementById("contenedor-details");
const locationSearch = location.search
console.log(locationSearch);
let parametroEvents = new URLSearchParams(locationSearch)
console.log(parametroEvents);
let idEvents = parametroEvents.get("id")



fetch("https://mindhub-xj03.onrender.com/api/amazing")
  .then(respuesta => respuesta.json())// me devuelve otra promesa o un objeto de js
  .then(data => {

    datosEvents = data.events

    let filter = datosEvents.find(cardId => cardId._id == idEvents)

    crearContenedorDetails(filter, containerDetails)

  })
  .catch(error => console.log(error))

// LocationHTML es la ubicacion en mi html, donde va la card
function crearContenedorDetails(object, locationHTML) { //condición ? expr1 : expr2
  locationHTML.innerHTML = ` 
  <div class=" cont-details container-fluid horizontal-card">
    <div class="w-50 margin">
      <img src="${object.image}" class="img-fluid rounded-1" alt="...">
    </div>
    <div class="w-50 margin">
      <div class="card-body ms-1">
        <h5 class="card-title details">${object.name}</h5>
          <p class="card-text details">
          <span>Date: </span>${object.date} <br>
          ${object.description}<br>
          <span>Category: </span> ${object.category}<br>
          <span>Place: </span> ${object.place}<br>
          <span>Capacity: </span> ${object.capacity}<br>
          <span>${object.assistance ? `Assistance` : `Estimate assistance`}</span>:${object.assistance || object.estimate} <br> 
          <span>Price: </span> ${object.price}</p>
      </div>
     </div>
  </div>
    `

}
