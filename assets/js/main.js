import {imprimirMaqueta,imprimirCheckbox,imprimirValorInput} from "./modulos/funciones.js"


let contenedorTarjetas = document.getElementById("contenedor")
let datosEvents;
let inputBusqueda = document.getElementById("search")
let contenedorCheck = document.getElementById ("container-check")

// --------------------------------------FETCH----------------------------------------

fetch("https://mindhub-xj03.onrender.com/api/amazing")
 
  .then(respuesta => respuesta.json())// me devuelve otra promesa o un objeto de js
  .then(data => {
      datosEvents = data.events
// CREAMOS UN ARRAY DE CATEGORIAS      
      let categoriasRepetidas = datosEvents.map( events => events.category)
      console.log(categoriasRepetidas);
// Se vuelven categorias unicas       
      let categorias = Array.from(new Set(categoriasRepetidas))
      console.log(categorias);
// Imprimimos la maqueta y el check
      imprimirMaqueta(datosEvents,contenedorTarjetas)
      imprimirCheckbox(categorias, contenedorCheck)
      
// Traemos los escuchadores para que se ejecuten en la cola del then, ya que no podemos llamar ninguna funcion 
// input de busqueda
      inputBusqueda.addEventListener( 'keyup', () => { 
        let checkboxValues = checkboxFilter();
        let busqueda = imprimirValorInput(inputBusqueda)
        let arrayBusqueda = dataFilter(checkboxValues, busqueda);
        imprimirMaqueta(arrayBusqueda,contenedorTarjetas)
      })
// input del check     
      contenedorCheck.addEventListener('click', (e) =>{
        let checkboxValues = checkboxFilter();
        let busqueda = imprimirValorInput(inputBusqueda)
        let dataFiltered = dataFilter(checkboxValues, busqueda);    
         imprimirMaqueta(dataFiltered,contenedorTarjetas);
     
     });
     
   
  })
  .catch(error => console.log(error))






// SACAR LOS VALORES DEL CHECKBOX 
// map recorre un array y te transforma cada elemento, en lo que yo quiera 
// value: valor de del input en html 
function checkboxFilter(){
  let checks = Array.from(contenedorCheck.querySelectorAll('.form-check-input'));
  let checksFilter = checks.filter( checkbox => checkbox.checked);
  let valueFilter = checksFilter.map(checkbox => checkbox.value); 
  return valueFilter;
}

// en el caso de que no haya datos para filtrar no se filtra 
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
