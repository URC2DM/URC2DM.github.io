var urc = document.getElementById('urc');
var response = document.getElementById('response');
var btnGenerar = document.getElementById('btnGenerar');
var btnBorrar = document.getElementById('btnBorrar');
var btnOpciones = document.getElementById('btnOpciones');
var btnClose = document.getElementById('btnClose');
var arrayURC = [];

btnGenerar.addEventListener('click',function(){
    borrarRespuesta();
    /*opciones*/
    var dimension = document.getElementById('in1').value;
    var rectangulo = document.getElementById('in2').checked;
    var padding = document.getElementById('in3').value;
    var color = document.getElementById('in4').value;
    var pal = [color];
    var solo12 = document.getElementById('in5').checked;
    var soloNum = document.getElementById('in6').checked;

    if(urc.value){
        arrayURC = urc.value.split(" ");
        arrayURC.forEach(e => {
            if((solo12 && e.length == 12) && (soloNum && /^\d+$/.test(e))){ // 12 caracteres numericos
                generarDM(e, dimension, rectangulo, padding, pal)
            } else if ((solo12 && e.length == 12) && !soloNum){ // 12 caracteres
                generarDM(e, dimension, rectangulo, padding, pal)
            } else if (!solo12 && (soloNum && /^\d+$/.test(e))){ // solo numeros
                generarDM(e, dimension, rectangulo, padding, pal)
            } else if (!solo12 && !soloNum){ // sin restricciones
                generarDM(e, dimension, rectangulo, padding, pal)
            }
        });
        //urc.value = "";
    }
});

btnBorrar.addEventListener('click',function(){
    borrarRespuesta();
    urc.value = "";
});

btnOpciones.addEventListener('click',function(){
    var sidebar = document.getElementById("sidebar")
    if(sidebar.dataset.estado == "close"){
        sidebar.style.width = "250px";
        sidebar.dataset.estado = "open"
    }else{
        sidebar.style.width = "0";
        sidebar.dataset.estado = "close"
    }
});

btnClose.addEventListener('click',function(){
    var sidebar = document.getElementById("sidebar")
    sidebar.style.width = "0";
    sidebar.dataset.estado = "close"
});

function borrarRespuesta(){
    while (response.firstChild) {
        response.firstChild.remove();
    }
}

function generarDM(e, dimension, rectangulo, padding, pal){
    var div = document.createElement('div');
    var urcText = document.createElement('p');
    urcText.textContent = e;
    response.appendChild(div);
    div.appendChild(DATAMatrix({
        msg: e,
        dim: dimension,
        rct: rectangulo,
        pad: padding,
        pal: pal,
    }))
    div.appendChild(urcText);
}