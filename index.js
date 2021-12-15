function imprimirFecha() {
  today = new Date();
  var mes = today.getMonth() + 1;
  if (mes < 10) {
    var mes = "0" + m;
  }
  var cadenaFechaYhora =
  "Fecha: " + today.getDate() + "/" + mes + "/" + today.getFullYear();
  document.getElementById("fechaYhora").innerHTML = cadenaFechaYhora;
}

window.onload = function () {
  imprimirFecha();
};

cargarPaisesenSelector();

function cargarPaisesenSelector() {
const cadenaDeBusqueda = "https://covid-api.mmediagroup.fr/v1/history?"
const cadenaDeBusqueda1 = cadenaDeBusqueda+"&status=Confirmed"
fetch(cadenaDeBusqueda1)
  .then(response => response.json())
  .then(estadisticas => {
      console.log(estadisticas);
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
    });
  }

    function getPais() {
      document.getElementById('loader').style.visibility='initial';
      var e = document.getElementById("campos");
      var pais = e.value;
      imprimirGraficos(pais);
    }

    function imprimirGraficos(paisBuscado) {
      console.log(paisBuscado);
      const cadenaDeBusqueda = "https://covid-api.mmediagroup.fr/v1/history?"
      const cadenaDeBusqueda1 = cadenaDeBusqueda+"country="+paisBuscado+"&status=Confirmed"
      fetch(cadenaDeBusqueda1)
        .then(response => response.json())
        .then(nombres => {var elementos =(Object.keys(nombres.All.dates).length);
        console.log(elementos);
        const dataArray = [nombres.All.dates];

        const ctx = document.getElementById("myChart1").getContext("2d");
        const myChart1 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                label: "# de Confirmados de COVID-19 "+paisBuscado,
                data: dataArray[0],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 0.5,
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
        });})
        const cadenaDeBusqueda2 = cadenaDeBusqueda+"country="+paisBuscado+"&status=Deaths"
        fetch(cadenaDeBusqueda2)
        .then(response => response.json())
        .then(nombres => {var elementos =(Object.keys(nombres.All.dates).length);
        console.log(elementos);
        const dataArray = [nombres.All.dates];
       
        const ctx = document.getElementById("myChart2").getContext("2d");

        const myChart2 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                label: "# de Muertes de COVID-19 "+paisBuscado,
                data: dataArray[0],
 
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 0.5,
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
        });})
        
        const cadenaDeBusqueda3 = cadenaDeBusqueda+"country="+paisBuscado+"&status=Recovered"
        fetch(cadenaDeBusqueda3)
        .then(response => response.json())
        .then(nombres => {var elementos =(Object.keys(nombres.All.dates).length);
        console.log(elementos);
        const dataArray = [nombres.All.dates];
        const ctx = document.getElementById("myChart3").getContext("2d");

        const myChart3 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [],
            datasets: [
              {
                label: "# de Recuperados de COVID-19 "+paisBuscado,
                data: dataArray[0],

                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 0.5,
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
        });})
       
        document.getElementById('loader').style.visibility = "hidden"; 
    }

    async function destruirChart1() {
      await myChart1.destroy();
    }
    async function destruirChart2() {
      await myChart2.destroy();
    }
    async function destruirChart3() {
      await myChart3.destroy();
    }
