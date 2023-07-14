let contenedorTarjetas = document.getElementById("contenedor")
let datosEvents = data.events
let date = data.currentDate;
let inputBusqueda = document.getElementById("search")
let contenedorCheck = document.getElementById ("container-check")


let categoriasRepetidas = datosEvents.map( events => events.category)
console.log(categoriasRepetidas);

let categorias = Array.from(new Set(categoriasRepetidas))
console.log(categorias);

function crearMaqueta(object) {
    return ` <div class=" card-mob col p-3 d-flex justify-content-center ">
    <div class="card">
      <img src="${object.image}" class=" image-card card-img-top food" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center mb-3">${object.name}</h6>
        <h6 class="card-text text-center">${object.description}</h6>
        <div class="d-flex flex-row justify-content-between align-items-center price-details">
          <p>Price:${object.price}</p> 
            <a class="boton" href="../pages/details1.html?id=${object._id}">Details</a>
        </div>
      </div>
    </div>
  </div>`
}

function imprimirMaqueta(events, date) {
  if(events.length == 0){
    contenedorTarjetas.innerHTML = "Oops! We have not found results for your search";
    return;
  }
    for (let evento of events) {
        if (evento.date >= date) {
            contenedorTarjetas.innerHTML += crearMaqueta(evento)
        }
    }
}

function crearCheckbox(events){
  return `
  <div class="check">
    <input class="form-check-input" type="checkbox" id="${events}" value="${events}">
    <label class="form-check-label" for="${events}">${events}</label>
    </div>`  
}


function checkboxFilter(){
    let checks = Array.from(contenedorCheck.querySelectorAll('.form-check-input'));
    let checksFilter = checks.filter( checkbox => checkbox.checked);
    let valueFilter = checksFilter.map(checkbox => checkbox.value);
    return valueFilter;
}


function dataFilter(arrayCategories, searchValue){
  let dataFilter = datosEvents;
  if(arrayCategories.length > 0){
    dataFilter = dataFilter.filter(evento => arrayCategories.includes(evento.category));

  }
  if(searchValue){
    dataFilter = dataFilter.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase().trim()));
  }
  
  return dataFilter;
}


function imprimirCheckbox(arrayCategory, checkbox) {
  for ( let categoria of arrayCategory){
    checkbox.innerHTML += crearCheckbox(categoria)
  }
}

imprimirCheckbox(categorias, contenedorCheck)
imprimirMaqueta(datosEvents,date)

function imprimirValorInput(inputBuscador) {
  let resultado =  inputBuscador.value
  return resultado;
}

inputBusqueda.addEventListener( 'keyup', () => { 
  contenedorTarjetas.innerHTML = ""
  let checkboxValues = checkboxFilter();
  let busqueda = imprimirValorInput(inputBusqueda)
  let arrayBusqueda = dataFilter(checkboxValues, busqueda);
  imprimirMaqueta(arrayBusqueda,date)
  console.log("hola");
})
contenedorCheck.addEventListener('click', (e) =>{
    contenedorTarjetas.innerHTML = ""
     let checkboxValues = checkboxFilter();
     let busqueda = imprimirValorInput(inputBusqueda)
     let dataFiltered = dataFilter(checkboxValues, busqueda);    
      imprimirMaqueta(dataFiltered,date);
  
  });
  