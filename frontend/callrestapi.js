var url="http://localhost:3330/api/gatos";

function postGato(){
    console.log(url);

    var myName = $('#name').val();
    var myAttack = $('#attack').val();
    var myType = $('#type').val();
    var mySpeed = $('#speed').val();
    var myDefense = $('#defense').val();
    var myCounter = $('#counter').val();
    var myStrong = $('#strong').val();

    var fileInput = $('#image')[0];
    var file = fileInput.files[0];
    if (!file) {
        console.log("No se ha seleccionado un archivo.");
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        var myImage = reader.result;
        var mygato ={
            name : myName,
            attack : myAttack,
            type : myType,
            speed : mySpeed,
            defense : myDefense,
            counter : myCounter,
            strong : myStrong,
            image : myImage 
        };
        console.log(mygato);

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function(data){
                console.log(data);
                $('#resultado').html(JSON.stringify(data.gato));

            },
            data: JSON.stringify(mygato)
        });
    };
    var reader = new FileReader();
reader.onload = function () {
    // código para procesar el archivo
};
reader.onerror = function () {
    console.log("Error al leer el archivo");
};
reader.readAsDataURL(file);

}

function getGatos(){
    console.log(url);

    $.getJSON(url,
        function(json){
            console.log(json);

            var arrGatos = json.gatos;

            var htmlTableGatos = '';

            arrGatos.forEach(function(item){
                console.log(item);
                htmlTableGatos += '<div class="pokemon-card">' +
                '<div class="pokemon-card__header">' +
                    '<h2 class="pokemon-card__name">' + item.name + '</h2>' +
                '</div>' +
                '<div class="pokemon-card__image">' +
                    '<img src="data:image/png;base64,' + item.image + '" alt="' + item.name + '">' +
                '</div>' +
                '<div class="pokemon-card__body">' +
                    '<table>' +
                        '<tr><td>Attack:</td><td>' + item.attack + '</td></tr>' +
                        '<tr><td>Type:</td><td>' + item.type + '</td></tr>' +
                        '<tr><td>Speed:</td><td>' + item.speed + '</td></tr>' +
                        '<tr><td>Defense:</td><td>' + item.defense + '</td></tr>' +
                        '<tr><td>Counter:</td><td>' + item.counter + '</td></tr>' +
                        '<tr><td>Strong:</td><td>' + item.strong + '</td></tr>' +
                    '</table>' +
                '</div>' +
            '</div>';                   
});
            htmlTableGatos += '</table>';

            $('#resultado').html(htmlTableGatos);
        }
    );
}


function previewImage(event) {
    var preview = document.querySelector('#preview');
    var file = event.target.files[0];
    var reader = new FileReader();
  
    reader.onloadend = function() {
      preview.src = reader.result;
      preview.style.display = 'block';
    }
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
      preview.style.display = 'none';
    }
  }
  