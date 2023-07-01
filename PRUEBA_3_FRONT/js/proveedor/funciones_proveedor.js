function mostrarDatos(element, index, arr){
  //index el que recorre
  //element es el valor
  //del documento selecciona la clase .data
arr[index] = document.querySelector('.data').innerHTML += 
`
<tr>
  <td>${element.id_proveedor}</td>
  <td>${element.rut}-${element.v_rut}</td>
  <td>${element.razon_social}</td>
  <td>${element.email}</td>
  
  <td>
  <!-- ACTUALIZAR -->
  <!-- Modal -->
  <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onclick="items=${element.id_proveedor};">Actualizar</button>
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Actualizar Proveedor</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                  <form>
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" id="rut_proveedor2" placeholder="RUT" aria-label="RUT">
                    <span class="input-group-text">-</span>
                    <input type="text" class="form-control" id="v_rut2" placeholder="" aria-label="">
                  </div>

                  <div class="form-group row">
                    <label for="razon_social" class="col-form-label">razon social</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="razon_social2" placeholder="Ingrese Nuevo Codigo Numerico" >
                  </div>
                  </div>
                  
                  <div class="form-group row">
                    <label for="email_proveedor" class="col-form-label">email</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="email_proveedor2" placeholder="Ingrese Nuevo Codigo Numerico" >
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
              <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Mensaje de confirmacion</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Desea aplicar los cambios?...
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
      <button type="button" class="btn btn-primary" onclick="items=${element.id_proveedor};" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      ELIMINAR
      </button>

      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
          <div class="modal-content">
          <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">ELIMINAR Proveedor</h1>
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


function actualizar(id_proveedor) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var rut_proveedor = document.getElementById('rut_proveedor2').value;
  var v_rut = document.getElementById('v_rut2').value;
  var razon_social = document.getElementById('razon_social2').value;
  var email_proveedor = document.getElementById('email_proveedor2').value;
  console.log(rut_proveedor)
  var raw = JSON.stringify({
    "rut": rut_proveedor,
    "v_rut": v_rut,
    "razon_social": razon_social,
    "email": email_proveedor
  });
  
  console.log(id_proveedor, raw);
  
  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch('http://164.90.186.2:1299/api/proveedor/' + id_proveedor, requestOptions)
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



function listaProducto(){
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");


var raw = JSON.stringify({
  "query": "Select * from proveedor;"
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

  fetch('http://164.90.186.2:1299/dynamic/proveedor', requestOptions)
  //de vuelve un archivo json
    .then(response => response.json())
    //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
    .then((json)=>json.forEach(mostrarDatos))
  
    .then(response => console.log(result))
    .catch(err => console.error('error', err));
};


// ELEMINIAR
function eliminar(id_proveedor){
  console.log(id_proveedor)
  var options = {
      method: 'DELETE',
      redirect: 'follow'
  }
  
fetch(`http://164.90.186.2:1299/api/proveedor/${id_proveedor}`, options)
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




// VALIDACION RUT

function validarRut(rut, v_rut) {
  // Eliminar puntos del rut (si los tiene)
  rut = rut.replace(/\./g, '');

  // Validar formato del rut y el verificador
  var rutRegex = /^\d{1,8}$/;
  if (!rutRegex.test(rut)) {
    alert('Por favor, ingrese un RUT válido.');
    return false;
  }

  // Validar formato del verificador
  var verificadorRegex = /^\d$|^k$/i;
  if (!verificadorRegex.test(v_rut)) {
    alert('Por favor, ingrese un dígito verificador válido (1-9 o K).');
    return false;
  }

  // Calcular dígito verificador esperado
  var reversedRut = Array.from(rut).reverse();
  var multiplicador = 2;
  var suma = 0;

  for (var i = 0; i < reversedRut.length; i++) {
    suma += parseInt(reversedRut[i]) * multiplicador;
    multiplicador = multiplicador >= 7 ? 2 : multiplicador + 1;
  }

  var dvEsperado = 11 - (suma % 11);
  var dvCalculado = dvEsperado === 11 ? 0 : dvEsperado === 10 ? 'K' : dvEsperado.toString();

  // Comparar dígito verificador esperado con el ingresado
  if (dvCalculado.toUpperCase() !== v_rut.toUpperCase()) {
    alert('Por favor, ingrese un RUT válido.');
    return false;
  }

  return true;
}



// VALIDACION

function validarFormulario() {
  var rutProveedor = document.getElementById("rut_proveedor").value;
  var vRut = document.getElementById("v_rut").value;
  var razonSocial = document.getElementById("razon_social").value;
  var emailProveedor = document.getElementById("email_proveedor").value;

  // Validar campos numéricos
  if (isNaN(rutProveedor) || isNaN(vRut)) {
    alert("Ingrese datos numéricos en los campos correspondientes.");
    return false;
  }

  // Validar campo razon_social (solo caracteres de texto)
  var textoPattern = /^[A-Za-z\s]+$/;
  if (!textoPattern.test(razonSocial)) {
    alert("Ingrese una razón social válida (solo caracteres de texto).");
    return false;
  }

  // Validar campo de texto
  if (!isNaN(emailProveedor)) {
    alert("Ingrese datos de texto en el campo correspondiente.");
    return false;
  }

  // Validar estructura de correo electrónico
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailProveedor)) {
    alert("Ingrese una dirección de correo electrónico válida.");
    return false;
  }

  // Si todos los campos son válidos, se puede continuar con el proceso
  return true;
}

function validarCamposVacios() {
  var rut_proveedor = document.getElementById("rut_proveedor").value;
  var v_rut = document.getElementById("v_rut").value;
  var razon_social = document.getElementById("razon_social").value;
  var email_proveedor = document.getElementById("email_proveedor").value;

  if (
    rut_proveedor.trim() === "" ||
    v_rut.trim() === "" ||
    razon_social.trim() === "" ||
    email_proveedor.trim() === ""
  ) {
    alert("Por favor, complete todos los campos.");
    return false;
  }

  return true;
}




// AGREGAR
  
  function agregar() {
    // Validar el formulario
    if (!validarCamposVacios()) {
      return; // Salir de la función si hay campos vacíos
    }
    // Campos del formulario
    var rut_proveedor = document.getElementById('rut_proveedor').value;
    var v_rut = document.getElementById('v_rut').value;
    
    // Validar el RUT
    if (!validarRut(rut_proveedor, v_rut)) {
      return; // Salir de la función si el RUT no es válido
    }
    
    var razon_social = document.getElementById('razon_social').value;
    var email_proveedor = document.getElementById('email_proveedor').value;
    

    if (!validarFormulario()) {
      return; // Salir de la función si el formulario no es válido
    }
    // Crear el headers para pasar a JSON
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    // Pasar al JSON cada una de las filas obtenidas
    var raw = JSON.stringify({
      "rut": rut_proveedor,
      "v_rut": v_rut,
      "razon_social": razon_social,
      "email": email_proveedor
    });
  
    // Configurar la variable options con los valores necesarios para la función fetch
    var options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch('http://164.90.186.2:1299/api/proveedor/', options)
      .then(response => {
        if (response.status == 200) {
          alert('Se agregó correctamente...');
          location.reload();
        } else {
          alert('Error al agregar los datos...');
        }
      })
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  




