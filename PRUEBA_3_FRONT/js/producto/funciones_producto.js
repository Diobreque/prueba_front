function mostrarDatos(element, index, arr){
  //index el que recorre
  //element es el valor
  //del documento selecciona la clase .data
arr[index] = document.querySelector('.data').innerHTML += 
`
<tr>
<td>${element.id_producto}</td>
<td>${element.nombre_producto}</td>
<td>${element.precio_producto}</td>
<td>${element.cantidad}</td>
<td>${element.descripcion_producto}</td>
<td>${element.nombre_marca}</td>
<td>${element.nombre_categoria}</td>
<td>${element.razon_social}</td>

  <td>
  <!-- ACTUALIZAR -->
  <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel">Actualizar Producto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form>
            <div class="form-group row">
                <label for="nom_producto" class="col-form-label">Nombre Producto</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="nom_producto2" placeholder="Ingrese Nuevo Nombre Producto">
                </div>
            </div>
        
            <div class="form-group row">
                <label for="precio_producto" class="col-form-label">Precio</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="precio_producto2" placeholder="Ingrese Precio Producto">
                </div>
            </div>
        
            <div class="form-group row">
                <label for="descripcion" class="col-form-label">Descripción</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="descripcion2" placeholder="Ingrese descripción">
                </div>
            </div>
        
            <div class="form-group row">
              <label for="marca" class="col-form-label">Marca</label>
              <div class="col-sm-10">
                  <select id="marca_actualizar" class="form-control" name="marca_actualizar"></select>
              </div>
          </div>
      
          <div class="form-group row">
              <label for="categoria" class="col-form-label">Categoría</label>
              <div class="col-sm-10">
                  <select id="categoria_actualizar" class="form-control" name="categoria_actualizar"></select>
              </div>
          </div>
      
          <div class="form-group row">
              <label for="proveedor" class="col-form-label">Proveedor</label>
              <div class="col-sm-10">
                  <select id="proveedor_actualizar" class="form-control" name="proveedor_actualzar"></select>
              </div>
          </div>
      </form>
      </div>
      <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onclick="actualizar(items);">Actualizar</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalToggleLabel2">Actualizar Producto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
          ¿ESTAS SEGURO?
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" data-bs-toggle="modal">Actualizar</button>
      </div>
    </div>
  </div>
</div>
<a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button" onclick="items=${element.id_producto}">Actualizar</a>
  <!-- FIN ACTUALIZAR -->

  <!-- ELIMINAR -->
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" onclick="items=${element.id_producto}" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  ELIMINAR
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ELIMINAR Producto</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ¿ESTÁS SEGURO?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CERRAR</button>
        <button type="button" class="btn btn-primary" onclick="eliminar(items)">ELIMINAR</button>
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
  "query": "SELECT p.id_producto, p.nombre_producto, p.precio_producto, p.cantidad, p.descripcion_producto, m.nombre_marca, c.nombre_categoria, pv.razon_social FROM producto p, marca m, proveedor pv, categoria_producto c where p.id_marca = m.id_marca and p.id_proveedor = pv.id_proveedor and p.id_categoria = c.id_categoria;"
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  fetch('http://164.90.186.2:1299/dynamic/producto', requestOptions)
    .then(response => response.json())
    .then((json)=>json.forEach(mostrarDatos))
  
    .then(response => console.log(result))
    .catch(err => console.error('error', err));
};


// ELEMINIAR
function eliminar(id_producto) {
  console.log(id_producto);

  var optionsProducto = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  };


        fetch(`http://164.90.186.2:1299/api/producto/${id_producto}`, optionsProducto)
          .then(responseProducto => {
            if (responseProducto.status === 200) {
              console.log('Producto eliminado correctamente.');
              alert('Se eliminó el producto y su stock correctamente.');
              location.reload();
            } else {
              console.log('Error al eliminar el producto.');
              alert('Error al eliminar el producto.');
            }
          })
        }
// AGREGAR


var proveedorSeleccionado = "";
var categoriaSeleccionada = "";
var marcaSeleccionada = "";




function obtenerMarcas() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT id_marca, nombre_marca FROM marca;"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch('http://164.90.186.2:1299/dynamic/marca', requestOptions)
        .then(response => response.json())
        .then(data => {
            var select = document.getElementById('marca');
            data.forEach(item => {
                var option = document.createElement('option');
                option.text = item.nombre_marca;
                option.value = item.id_marca;
                select.appendChild(option);
            });

            marcaSeleccionada = select.value;
        })
        .catch(error => console.error('Error:', error));
}

function obtenerProveedor() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT id_proveedor, razon_social FROM proveedor;"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch('http://164.90.186.2:1299/dynamic/proveedor', requestOptions)
        .then(response => response.json())
        .then(data => {
            var select = document.getElementById('proveedor');
            data.forEach(item => {
                var option = document.createElement('option');
                option.text = item.razon_social;
                option.value = item.id_proveedor;
                select.appendChild(option);
            });


            proveedorSeleccionado = select.value;
        })
        .catch(error => console.error('Error:', error));
}

function obtenerCategoria() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT id_categoria, nombre_categoria FROM categoria_producto;"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch('http://164.90.186.2:1299/dynamic/categoria_producto', requestOptions)
        .then(response => response.json())
        .then(data => {
            var select = document.getElementById('categoria');
            data.forEach(item => {
                var option = document.createElement('option');
                option.text = item.nombre_categoria;
                option.value = item.id_categoria;
                select.appendChild(option);
            });


            categoriaSeleccionada = select.value;
        })
        .catch(error => console.error('Error:', error));
}

obtenerMarcas();
obtenerProveedor();
obtenerCategoria();

function validarProducto(nombre, precio, descripcion) {
  if (typeof nombre !== 'string' || /\d/.test(nombre)) {
    alert('Solo deben incluirse valores alfabeticos');
    return false;
  }
  if (typeof precio !== 'number' || isNaN(precio) || typeof precio === 'boolean') {
    alert('Solo se permiten valores numericos');
    return false;
  }
  if (typeof descripcion !== 'string' || /\d/.test(descripcion)) {
    alert('Solo deben incluirse valores alfabeticos');
    return false;
  }
  
  // Agrega aquí cualquier otra validación o regla de negocio necesaria
  
  return true;
}

function agregar() {
  var nombre_producto = document.getElementById('nom_producto').value;
  var precio = parseFloat(document.getElementById('precio_producto').value);
  var descripcion = document.getElementById('descripcion').value;

  if (validarProducto(nombre_producto, precio, descripcion)) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "nombre_producto": nombre_producto,
      "precio_producto": precio,
      "descripcion_producto": descripcion,
      "id_proveedor": proveedorSeleccionado,
      "id_categoria": categoriaSeleccionada,
      "id_marca": marcaSeleccionada
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('http://164.90.186.2:1299/api/producto/', requestOptions)
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
}




// ACTUALIZAR

function actualizar1(id_producto) {
  obtenerMarcas();
obtenerProveedor();
obtenerCategoria();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var nombre_producto = document.getElementById('nom_producto2').value;
  var precio_producto = document.getElementById('precio_producto2').value;
  var descripcion_producto = document.getElementById('descripcion_producto2').value;
  var raw = JSON.stringify({
    "nombre_producto": nombre_producto,
    "precio_producto": precio_producto,
    "descripcion_producto": descripcion_producto,
    "id_proveedor": proveedorSeleccionado,
    "id_categoria": categoriaSeleccionada,
    "id_marca": marcaSeleccionada
  });
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('http://164.90.186.2:1299/api/producto/' + id_producto, requestOptions)
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



function obtenerMarcas() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
      "query": "SELECT id_marca, nombre_marca FROM marca;"
  });

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  };

  fetch('http://164.90.186.2:1299/dynamic/marca', requestOptions)
      .then(response => response.json())
      .then(data => {
          var select = document.getElementById('marca');
          data.forEach(item => {
              var option = document.createElement('option');
              option.text = item.nombre_marca;
              option.value = item.id_marca;
              select.appendChild(option);
          });


          marcaSeleccionada = select.value;
      })
      .catch(error => console.error('Error:', error));
}

