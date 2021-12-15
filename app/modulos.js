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

