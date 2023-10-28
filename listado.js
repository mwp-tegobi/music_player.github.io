

var arrayData = new Array();
var archivoTxt = new XMLHttpRequest();
var file_ruta = "lista_musica.txt";


archivoTxt.open("GET",file_ruta,false);
archivoTxt.send(null);

// console.log(archivoTxt)

var excel = archivoTxt.responseText;
// console.log(excel)

let music_List2 = excel.split(`,`)
music_List2.pop();

let url1 = "musica/"
var music_List3 = [];


music_List2.forEach((el,ind) =>{
    // console.log(el)
    
    
    res = url1.concat(el);

    
    // console.log(res)
    
    music_List3.push(res)







})

// console.log(music_List3)


// console.log(music_List2)















