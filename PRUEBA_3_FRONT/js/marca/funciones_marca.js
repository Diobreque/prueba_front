function mostrarDatos(element, index, arr){
    //index el que recorre
    //element es el valor
    //del documento selecciona la clase .data
arr[index] = document.querySelector('.data').innerHTML += 
`
<tr>
    <td>${element.id_marca}</td>
    <td>${element.nombre_marca}</td>
    <td>${element.cod_marca}</td>

    <td>




    <!-- ACTUALIZAR -->
    <!-- Modal -->
    <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onclick="items=${element.id_marca};">Actualizar</button>
          <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Actualizar Marca</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <form>
              <div class="form-group row">
                <label for="nom_marca" class="col-form-label">Nombre marca</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="nom_marca2" placeholder="Ingrese Nuevo Nombre marca" >
              </div>
              </div>
              
              <div class="form-group row">
                <label for="cod_marca" class="col-form-label">Codigo marca</label>
                <div class="col-sm-10">
                <input type="text" class="form-control" id="cod_marca2" placeholder="Ingrese Nuevo Codigo Numerico" >
              </div>
              </div>
              
          </form>  
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Continuar</button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Estas Seguro?
              </div>
              <div class="modal-footer">
                <button class="btn btn-primary" data-bs-toggle="modal" onclick="actualizar(items);">Actualizar</button>
              </div>
            </div>
          </div>
        </div>
    <!-- FIN ACTUALIZAR -->


    <!-- ELIMINAR -->
    <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" onclick="items=${element.id_marca}, ${index};" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        ELIMINAR
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">ELIMINAR MARCA</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ¿ESTAS SEGURO?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
                <button type="button" class="btn btn-primary" onclick="eliminar(items);">ELIMINAR</button>
            </div>
            </div>
        </div>
        </div>
    <!-- FIN ELIMINAR -->
</td>

</tr>
`;
}

function listaProducto(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({
    "query": "Select * from marca;"
});
var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

    fetch('http://164.90.186.2:1299/dynamic/marca', requestOptions)
    //de vuelve un archivo json
      .then(response => response.json())
      //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
      .then((json)=>json.forEach(mostrarDatos))
    
      .then(response => console.log(result))
      .catch(err => console.error('error', err));
};


// ELEMINIAR
function eliminar(id_marca){
    console.log(id_marca)
    var options = {
        method: 'DELETE',
        redirect: 'follow'
    }
    
fetch(`http://164.90.186.2:1299/api/marca/${id_marca}`, options)
.then(response => {
if(response.status == 200){
    alert('Se elimino correctamente...');
    location.reload();
}else{
    alert('Error al eliminar los datos, probablemente esta siendo utilizados...');
}
})
.then(response => console.log(response))
.catch(err => console.error(err));
}


// AGREGAR
function agregar() {
  var nombre_marca = document.getElementById('nom_marca').value;
  var cod_marca = document.getElementById('cod_marca').value;

  if (typeof nombre_marca !== 'string' || /\d/.test(nombre_marca)) {
    alert('El nombre de marca no es válido. No puede contener valores numericos');
    return;
  }
  
  if (isNaN(cod_marca)) {
    alert('Solo se aceptan codigos numericos');
    return;
  }
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre_marca": nombre_marca,
    "cod_marca": cod_marca
  });
  
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('http://164.90.186.2:1299/api/marca/', requestOptions)
    .then(response => {
      if (response.status == 200) {
        alert('Se agregó correctamente...');
        location.reload();
      } else {
        alert('Error al agregar los datos...');
      }
    })
    .catch(err => console.error(err));
}

function actualizar(id_marca) {
  var nombre_marca = document.getElementById('nom_marca2').value;
  var cod_marca = document.getElementById('cod_marca2').value;
  
  if (typeof nombre_marca !== 'string' || /\d/.test(nombre_marca)) {
    alert('El nombre de marca no es válido. No puede contener valores numericos');
    return;
  }
  
  if (isNaN(cod_marca)) {
    alert('Solo se aceptan codigos numericos');
    return;
  }
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "nombre_marca": nombre_marca,
    "cod_marca": cod_marca
  });
  
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('http://164.90.186.2:1299/api/marca/' + id_marca, requestOptions)
    .then(response => {
      if (response.status == 200) {
        alert('Los datos se actualizaron correctamente...');
        location.reload();
      } else {
        alert('Error al actualizar los datos...');
      }
    })
    .catch(err => console.error(err));
}
