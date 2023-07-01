function mostrarDatos(element, index, arr){
    //index el que recorre
    //element es el valor
    //del documento selecciona la clase .data
arr[index] = document.querySelector('.data').innerHTML += 
`
<tr>
    <td>${element.id_categoria}</td>
    <td>${element.nombre_categoria}</td>
    <td>${element.cod_categoria}</td>

    <td>
    <!-- ACTUALIZAR -->
    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel">Actualizar Categoria</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <form>
          <div class="form-group row">
            <label for="nom_categoria" class="col-form-label">Nombre Categoria</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" id="nom_categoria2" placeholder="Ingrese Nuevo Nombre Categoria" >
          </div>
          </div>
          
          <div class="form-group row">
            <label for="cod_categoria" class="col-form-label">Codigo Categoria</label>
            <div class="col-sm-10">
            <input type="text" class="form-control" id="cod_categoria2" placeholder="Ingrese Nuevo Codigo Numerico" >
          </div>
          </div>
          
        </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalToggleLabel2">Actualizar Categoria</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cancelar"></button>
        </div>
        <div class="modal-body">
            ¿ESTAS SEGURO?
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-toggle="modal" onclick="actualizar(items);" >Actualizar</button>
        </div>
      </div>
    </div>
  </div>
  <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" onclick="items=${element.id_categoria}" role="button">Actualizar</a>
    <!-- FIN ACTUALIZAR -->

    <!-- ELIMINAR -->
    <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" onclick="items=${element.id_categoria}, ${index};" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        ELIMINAR
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">ELIMINAR CATEGORIA</h1>
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
    "query": "Select * from categoria_producto;"
});
var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

    fetch('http://164.90.186.2:1299/dynamic/categoria_producto', requestOptions)
    //de vuelve un archivo json
      .then(response => response.json())
      //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
      .then((json)=>json.forEach(mostrarDatos))
    
      .then(response => console.log(result))
      .catch(err => console.error('error', err));
};


// ELEMINIAR
function eliminar(id_categoria){
    console.log(id_categoria)
    var options = {
        method: 'DELETE',
        redirect: 'follow'
    }
    
fetch(`http://164.90.186.2:1299/api/categoria_producto/${id_categoria}`, options)
.then(response => {
if(response.status == 200){
    alert('Se elimino correctamente...');
    location.reload();
}else{
    alert('Error al eliminar los datos...');
}
})
.then(response => console.log(response))
.catch(err => console.error(err));
}


// AGREGAR

function agregar(){

    //crear el headders para pasar a json
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
      // campos del formulario
    var nombre_categoria = document.getElementById('txt_nom_categoria').value;
    var cod_categoria = document.getElementById('txt_cod_categoria').value;
    //pasamos al json cada una de las filas obtenidas
    var raw = JSON.stringify({
                "nombre_categoria": nombre_categoria,
                "cod_categoria": cod_categoria
    });
    //configuramos la variable opcion con los valores necesarios para nuestra función fetch
    var options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }
    //const options = {method: 'POST', body: '{"nombre_tipo_producto": 'nombre_tipo'}'};

  fetch('http://164.90.186.2:1299/api/categoria_producto/', options)
  .then(response => {
    if(response.status == 200){
        alert('Se agrego correctamente...');
        location.reload();
    }else{
        alert('Error al agregar los datos...');
    }
    })
  .then(response => console.log(response))
  .catch(err => console.error(err));
    }



// ACTUALIZAR

function actualizar(id_categoria) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var nombre_categoria = document.getElementById('nom_categoria2').value;
  var cod_categoria= document.getElementById('cod_categoria2').value;
  var raw = JSON.stringify({
    "nombre_categoria": nombre_categoria,
    "cod_categoria": cod_categoria
  });
  
   var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('http://164.90.186.2:1299/api/categoria_producto/' + id_categoria, requestOptions)
    .then(response => {
      if (response.status == 200) {
        alert('Los datos se actualizaron correctamente...');
        location.reload();
      } else {
        alert('Error al actualizar los datos...');
      }
    })
    .then(response => console.log(response))
    .catch(err => console.error(err));
}