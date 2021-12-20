//Funcion que imprime la fecha actual en el encabezado de la pagina web
export function imprimirFecha() {
  var today = new Date();
  var mes = today.getMonth() + 1;
  if (mes < 10) {
    var mes = "0" + m;
  }
  var cadenaFechaYhora =
  "Fecha: " + today.getDate() + "/" + mes + "/" + today.getFullYear();
  document.getElementById("fechaYhora").innerHTML = cadenaFechaYhora;
};

//Funcion que carga en las opciones del campo de entrada Select los paises de los cuales se cuenta con informacion estadistica de Covid-19 en la API
export async function cargarPaisesenSelector() {
    const cadenaDeBusqueda = "https://covid-api.mmediagroup.fr/v1/history?"
    const cadenaDeBusqueda1 = cadenaDeBusqueda+"&status=Confirmed"
    var response = await fetch(cadenaDeBusqueda1)
    .then(response => response.json())
    .then(estadisticas => {
        const arregloPaises=[];
        var cont=0;
         Object.values(estadisticas).forEach(val => {
          arregloPaises[cont]= val.All.country;
          cont = cont+1;
          })
            
      const selector = document.querySelector("#campos");
      arregloPaises.forEach(elemento => {
      const option = document.createElement('option');
      const valor = elemento;
      option.value = valor;
      option.text = valor;
      selector.appendChild(option);
          }
          );
      document.getElementById('loader').style.visibility = "hidden";    
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
  }
  
/*Con esta funcion se imprime en una de las secciones de la pagina web los datos del pais del cual se estan graficando los datos estadisticos de Covid-19 Nombre del Pais, Num de Pobladores, Localizacion, etc, */
export function imprimirDatosPais(nombrePais, poblacion, vida, localizacion, capital) {
  const nodo = document.getElementById("lista-datos");
    while (nodo.firstChild) {
      nodo.removeChild(nodo.firstChild);
    }    
    var contenido;
    var arrayDatos1 = [nombrePais, poblacion, vida, localizacion, capital];
    var arrayDatos2 = ["Pais: ","Poblacion: ","Esperanza de Vida (años); ","Localizacion: ","Capital: "];
        
    for (var i=0; i<5; i++) {
      var li = document.createElement("li");
      var p = document.createElement("p");
      contenido = arrayDatos2[i] + arrayDatos1[i];
      p.appendChild(document.createTextNode(contenido));
      document.querySelector("#lista-datos").appendChild(li).appendChild(p);
    }

}

