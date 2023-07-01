function obtenerMarcas() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT nombre_marca FROM marca;"
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
                option.value = item.nombre_marca;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error:', error));
}




function agregar() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var nombreMarca = document.getElementById('marca').value;
    var codMarca = document.getElementById('cod_marca').value;

    var data = JSON.stringify({
        "nombre_marca": nombreMarca,
        "cod_marca": codMarca
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch('http://164.90.186.2:1299/api/marca/', requestOptions)
        .then(response => {
            if (response.status == 200) {
                alert('Se agregó correctamente...');
            } else {
                alert('Error al agregar los datos...');
            }
        })
        .catch(error => console.error('Error:', error));
}

obtenerMarcas();
