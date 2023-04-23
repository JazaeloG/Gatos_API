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

            var htmlTableGatos = '<table border=1">';

            arrGatos.forEach(function(item){
                console.log(item);
                htmlTableGatos += '<tr>'+
                                        '<td>' + item.id + '</td>' +
                                        '<td>' + item.name + '</td>' +
                                        '<td>' + item.attack + '</td>' +
                                        '<td>' + item.type + '</td>' +
                                        '<td>' + item.speed + '</td>' +
                                        '<td>' + item.defense + '</td>' +
                                        '<td>' + item.counter + '</td>' +
                                        '<td>' + item.strong + '</td>' +
                                        '<td><img src="data:image/png;base64,' + item.image + '"></td>' +
                                   '</tr>';                   
            });
            htmlTableGatos += '</table>';

            $('#resultado').html(htmlTableGatos);
        }
    );
}


function previewImage() {
    var preview = $('#preview')[0];
    var fileInput = $('#image')[0];
    preview.style.display = "block";
    preview.src = URL.createObjectURL(fileInput.files[0]);
}
$('#image').change(function() {
    previewImage();
})

