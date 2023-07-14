let datosEvents = data.events
let containerDetails = document.getElementById("contenedor-details");
const locationSearch = location.search 
console.log(locationSearch);
let parametroEvents = new URLSearchParams(locationSearch)
console.log(parametroEvents);
let idEvents = parametroEvents.get("id")
// get captura el elemento id que viene por parametro
let filter = datosEvents.find( cardId => cardId._id === idEvents )
console.log(idEvents);
// LocationHTML es la ubicacion en mi html, donde va la card
function crearContenedorDetails(object, locationHTML) {
    locationHTML.innerHTML= ` <div class=" cont-details container-fluid horizontal-card">
    <div class="w-50 margin">
      <img src="${object.image}" class="img-fluid rounded-1" alt="...">
    </div>
    <div class="w-50 margin">
      <div class="card-body ms-1">
        <h5 class="card-title details">${object.name}</h5>
        <p class="card-text details">
          <span>Date: </span>${object.date} <br>
          Enjoy your favorite dishes from different countries in a unique event for the whole family. <br>
          <span>Category: </span> ${object.category}<br>
          <span>Place: </span> ${object.place}<br>
          <span>Capacity: </span> ${object.capacity}<br>
          <span>Assistance: </span> ${object.assistance}<br>
          <span>Price: </span> ${object.price}</p>
          </div>
          </div>
      </div>
    <`
    
}
crearContenedorDetails(filter, containerDetails)