function imprimirFecha() {
  today = new Date();
  var mes = today.getMonth() + 1;
  if (mes < 10) {
    var mes = "0" + m;
  }
  var cadenaFechaYhora =
  "Fecha: " + today.getDate() + "/" + mes + "/" + today.getFullYear();
  document.getElementById("fechaYhora").innerHTML = cadenaFechaYhora;
};

export {imprimirFecha};

function cargarPaisesenSelector() {
  const cadenaDeBusqueda = "https://covid-api.mmediagroup.fr/v1/history?"
  const cadenaDeBusqueda1 = cadenaDeBusqueda+"&status=Confirmed"
  fetch(cadenaDeBusqueda1)
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
    .catch(error => toastr["error"]("Error", error)); 
};

export {cargarPaisesenSelector};

function getPais() {
  document.getElementById('loader').style.visibility="visible";
  var e = document.getElementById("campos");
  var pais = e.value;
  imprimirGraficos(pais);
};

export {getPais};

function imprimirGraficos(paisBuscado) {
  
  const cadenaDeBusqueda = "https://covid-api.mmediagroup.fr/v1/history?"
  const cadenaDeBusqueda1 = cadenaDeBusqueda+"country="+paisBuscado+"&status=Confirmed"
  fetch(cadenaDeBusqueda1)
  .then(response => response.json())
  .then(nombres => { const dataArray = [nombres.All.dates];
        var nombrePais = nombres.All.country;
        var poblacion = nombres.All.population;
        var vida = nombres.All.life_expectancy;
        var localizacion = nombres.All.location;
        var capital = nombres.All.capital_city;
        imprimirDatosPais(nombrePais, poblacion, vida, localizacion, capital);
          
        const ctx = document.getElementById("myChart1").getContext("2d");
        
        if (myChart1) {
          myChart1.destroy();
        }

         myChart1 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                label: "# de Confirmados de COVID-19 "+paisBuscado,
                data: dataArray[0],
                fill: false,
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: 'rgb(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
    }
    )
    .catch(error => toastr["error"]("Error", error));
    

    const cadenaDeBusqueda2 = cadenaDeBusqueda+"country="+paisBuscado+"&status=Deaths"
      fetch(cadenaDeBusqueda2)
      .then(response => response.json())
      .then(nombres => { const dataArray = [nombres.All.dates];
       
        const ctx = document.getElementById("myChart2").getContext("2d");
        if (myChart2) {
          myChart2.destroy();
        }

        myChart2 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                label: "# de Muertes de COVID-19 "+paisBuscado,
                data: dataArray[0],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: 'rgb(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      })
      .catch(error => toastr["error"]("Error", error));
        
    const cadenaDeBusqueda3 = cadenaDeBusqueda+"country="+paisBuscado+"&status=Recovered"
      fetch(cadenaDeBusqueda3)
      .then(response => response.json())
      .then(nombres => { const dataArray = [nombres.All.dates];
 
        const ctx = document.getElementById("myChart3").getContext("2d");
        if (myChart3) {
          myChart3.destroy();
        }

        myChart3 = new Chart(ctx, {
          type: "line",
            data: {
              labels: [],
                datasets: [
                {
                label: "# de Recuperados de COVID-19 "+paisBuscado,
                data: dataArray[0],
                backgroundColor: "rgba(75, 192, 192, 1)",
                borderColor: 'rgb(75, 192, 192, 1)',
                borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
              y: {
                beginAtZero: true,
                },
              },
            },
          }
        );
        
        document.getElementById('loader').style.visibility = "hidden";
      })
      .catch(error => toastr["error"]("Error", error));
};

export {imprimirGraficos};

function imprimirDatosPais(nombrePais, poblacion, vida, localizacion, capital) {
    
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

};

export {imprimirDatosPais};

