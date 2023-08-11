var urc = document.getElementById('urc');
var response = document.getElementById('response');
var arrayURC = [];
var btnGenerate = document.getElementById('btnGenerate');
var btnClear = document.getElementById('btnClear');
var btnOptions = document.getElementById('btnOptions');
var btnClose = document.getElementById('btnClose');
var bntLangEN = document.getElementById('bntLangEN');
var bntLangES = document.getElementById('bntLangES');
var optionsLabel = document.getElementById('optionsLabel');
var in1 = document.getElementById('in1Label');
var in2 = document.getElementById('in2Label');
var in3 = document.getElementById('in3Label');
var in4 = document.getElementById('in4Label');
var in5 = document.getElementById('in5Label');
var in6 = document.getElementById('in6Label');
var languageLabel = document.getElementById('languageLabel');

var dim = document.getElementById('in1');
var rect = document.getElementById('in2');
var pad = document.getElementById('in3');
var color = document.getElementById('in4');
var only12Char = document.getElementById('in5');
var onlyNum = document.getElementById('in6');
var lang = document.getElementById('in7');

langJSON = {
    "btnGenerate": ["Generate", "Generar"],
    "btnClear": ["Clear", "Borrar"],
    "btnOptions": ["Options", "Opciones"],
    "in1Label": ["Dimension", "Dimensión"],
    "in2Label": ["Rectangle", "Rectángulo"],
    "in3Label": ["Padding", "Espaciado"],
    "in4Label": ["Color", "Color"],
    "in5Label": ["Only 12 Characters", "Solo 12 Caracteres"],
    "in6Label": ["Only Numbers", "Solo Números"],
    "languageLabel": ["Language", "Idioma"]
};

setOptions();

setLangPage();

bntLangEN.addEventListener('click',function(){
    setLangEN();
    localStorage.setItem("lang", "EN");
});

bntLangES.addEventListener('click',function(){
    setLangES();
    localStorage.setItem("lang", "ES");
});


/*----------------Actualizar Opciones----------------*/
dim.addEventListener('change',function(){
    localStorage.setItem("dim", this.value);
})

rect.addEventListener('change',function(){
    localStorage.setItem("rect", this.checked);
})

pad.addEventListener('change',function(){
    localStorage.setItem("pad", this.value);
})

color.addEventListener('change',function(){
    localStorage.setItem("color", this.value);
})

only12Char.addEventListener('change',function(){
    localStorage.setItem("only12Char", this.checked);
})

onlyNum.addEventListener('change',function(){
    localStorage.setItem("onlyNum", this.checked);
})
/*--------------------------------------------------*/

btnGenerate.addEventListener('click',function(){
    borrarRespuesta();
    if(urc.value){
        arrayURC = urc.value.split(" ");
        arrayURC.forEach(e => {
            if((only12Char.checked && e.length == 12) && (onlyNum.checked && /^\d+$/.test(e))){ // 12 caracteres numericos
                generarDM(e, dim.value, rect.checked, pad.value, [color.value])
            } else if ((only12Char.checked && e.length == 12) && !onlyNum.checked){ // 12 caracteres
                generarDM(e, dim.value, rect.checked, pad.value, [color.value])
            } else if (!only12Char.checked && (onlyNum.checked && /^\d+$/.test(e))){ // solo numeros
                generarDM(e, dim.value, rect.checked, pad.value, [color.value])
            } else if (!only12Char.checked && !onlyNum.checked){ // sin restricciones
                generarDM(e, dim.value, rect.checked, pad.value, [color.value])
            }
        });
        //urc.value = "";
    }
});

btnClear.addEventListener('click',function(){
    borrarRespuesta();
    urc.value = "";
});

btnOptions.addEventListener('click',function(){
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

function generarDM(e, dim, rect, pad, pal){
    var div = document.createElement('div');
    var urcText = document.createElement('p');
    urcText.textContent = e;
    response.appendChild(div);
    div.appendChild(DATAMatrix({
        msg: e,
        dim: dim,
        rct: rect,
        pad: pad,
        pal: pal,
    }))
    div.appendChild(urcText);
}

function setOptions(){
    let storedDim = localStorage.getItem("dim");
    let storedRect = localStorage.getItem("rect");
    let storedPad = localStorage.getItem("pad");
    let storedColor = localStorage.getItem("color");
    let storedOnly12Char = localStorage.getItem("only12Char");
    let storedOnlyNum = localStorage.getItem("onlyNum");
    let storedLang = localStorage.getItem("lang");

   (storedDim) ? dim.value = storedDim : dim.value = 256;
   (storedRect) ? rect.checked = (storedRect === 'true') : rect.checked = false;
   (storedPad) ? pad.value = storedPad : pad.value = 2;
   (storedColor) ? color.value = storedColor : color.value = '#000000';
   (storedOnly12Char) ? only12Char.checked = (storedOnly12Char === 'true') : only12Char.checked = true;
   (storedOnlyNum) ? onlyNum.checked = (storedOnlyNum === 'true') : onlyNum.checked = true;
   (storedLang) ? lang.value = storedLang : lang.value = "EN";
}

function setLangEN(){
    bntLangEN.classList.add("selected");
    bntLangES.classList.remove("selected");
    lang.value = "EN";

    btnGenerate.innerText = langJSON.btnGenerate[0];
    btnClear.innerText = langJSON.btnClear[0];
    btnOptions.innerText = langJSON.btnOptions[0];
    optionsLabel.innerText = langJSON.btnOptions[0];
    in1Label.innerText = langJSON.in1Label[0];
    in2Label.innerText = langJSON.in2Label[0];
    in3Label.innerText = langJSON.in3Label[0];
    in4Label.innerText = langJSON.in4Label[0];
    in5Label.innerText = langJSON.in5Label[0];
    in6Label.innerText = langJSON.in6Label[0];
    languageLabel.innerText = langJSON.languageLabel[0];
}

function setLangES(){
    bntLangES.classList.add("selected");
    bntLangEN.classList.remove("selected");
    lang.value = "ES";

    btnGenerate.innerText = langJSON.btnGenerate[1];
    btnClear.innerText = langJSON.btnClear[1];
    btnOptions.innerText = langJSON.btnOptions[1];
    optionsLabel.innerText = langJSON.btnOptions[1];
    in1Label.innerText = langJSON.in1Label[1];
    in2Label.innerText = langJSON.in2Label[1];
    in3Label.innerText = langJSON.in3Label[1];
    in4Label.innerText = langJSON.in4Label[1];
    in5Label.innerText = langJSON.in5Label[1];
    in6Label.innerText = langJSON.in6Label[1];
    languageLabel.innerText = langJSON.languageLabel[1];
}

function setLangPage(){
    if(lang.value === "ES"){
        setLangES();
    }
}