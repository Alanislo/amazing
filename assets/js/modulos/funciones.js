export function crearMaqueta(object){
  return ` <div class=" card-mob p-3 col d-flex justify-content-center ">
  <div class="card">
    <img src="${object.image}" class=" image-card card-img-top food" alt="...">
    <div class="card-body">
      <h5 class="card-title text-center mb-3">${object.name}</h6>
      <h6 class="card-text text-center">${object.description}</h6>
      <div class="d-flex flex-row justify-content-between align-items-center price-details">
        <p>Price:${object.price}</p> 
          <a class="boton" href="./assets/pages/details1.html?id=${object._id}">Details</a>
      </div>
    </div>
  </div>
</div>`   
}

// imprimir maqueta, vaciar el contenedor de tarjetas 
export function imprimirMaqueta(datos,contenedorTarjetas) {
  contenedorTarjetas.innerHTML = ""
  if(datos.length == 0){
    contenedorTarjetas.innerHTML = "Oops! We have not found results for your search";
    return;
  }
    for ( let dato of datos){
        contenedorTarjetas.innerHTML += crearMaqueta(dato)
    }
}

// crear
export function crearCheckbox(events){
  return `
  <div class="check">
    <input class="form-check-input" type="checkbox" id="${events}" value="${events}">
    <label class="form-check-label" for="${events}">${events}</label>
    </div>`  
}

// imprimir checkbox
export function imprimirCheckbox(arrayCategory, checkbox) {
  for ( let categoria of arrayCategory){
    checkbox.innerHTML += crearCheckbox(categoria)
  }
}

// Sacamos el valor que el usuario escribe
export function imprimirValorInput(inputBuscador) {
  let resultado =  inputBuscador.value
  return resultado;
}
