const btn_play_pause = document.getElementById("btn_play_pause");
const btn_play = document.getElementById("play_btn");
const btn_pause = document.getElementById("pause_btn");
const btn_previus_song = document.querySelector(".control_previus_song");
const btn_next_song = document.querySelector(".control_next_song");

const btn_random_track = document.querySelector(".control_random");

let current_track = document.createElement("audio");

let slide_progress_song = document.querySelector(".slide_current_progress");
let time_inicio_contando = document.querySelector(".time_inicio");
let total_duration = document.querySelector(".time_fin");

let name_song_modification = document.querySelector(".name_song_mod");
let name_artist_modification = document.querySelector(".name_artist_mod");


let track_index;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let name_and_song = [];
let name_artist = [];
let name_song = [];

for (let i = 0; i < music_List3.length; i++){
    let cortar_Musica = music_List3[i].split("/");
    cortar_Musica.shift();
    
    let cortar_names = cortar_Musica[0].split(" - ");
    
    let cortar_mp3 = cortar_names[1].split(".mp3");
    
    cortar_mp3.pop();

    name_and_song.push(cortar_Musica);
    name_artist.push(cortar_names[0]);
    name_song.push(cortar_mp3);
}
// console.log(name_and_song)
// console.log(name_artist)
// console.log(name_song)




const winko_spin = document.querySelector(".winko_spin");
const vinilo_disk_container = document.querySelector(".vinilo_disk");
const vinilos_all = document.querySelectorAll(".all_vinilos");
let vinilo_index = 0;
// console.log(vinilos_all)

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();
    
    current_track.src = music_List3[track_index];
    
    name_song_modification.textContent = name_song[track_index];
    name_artist_modification.textContent = `--- ${name_artist[track_index]} ---`;
    
    winkoSpin();
    vinilo_animations();
    
    current_track.load();
    volumeChange();
    
    updateTimer = setInterval(setUpdate, 1000);
    current_track.addEventListener("ended", nextTrack);
}



function winkoSpin() {
    winko_spin.style.animation = `spin_animation_in .8s linear forwards`;
    
    if(winko_spin.classList.contains("animation_spin")){
        winko_spin.classList.remove("animation_spin");
        winko_spin.style.animation = `spin_animation_out .8s linear forwards`;
        
        setTimeout(() =>{
            winko_spin.style.animation = `spin_animation_in .8s linear forwards`;
            winko_spin.classList.add("animation_spin");
        },2100)
    }
    else{
        setTimeout(() =>{
            winko_spin.classList.add("animation_spin");
        },810)
    }
}
function vinilo_animations() {
    vinilos_all.forEach((el_vinilo) =>{
        
        if(el_vinilo.classList.contains("animation_first")){
            el_vinilo.classList.remove("animation_first");
            el_vinilo.classList.add("animation_third");
            
            el_vinilo.style.animation = `move_enter_animation 2s linear forwards`;
            
            setTimeout(() =>{
                el_vinilo.classList.add("vinilo_over_winko");
                el_vinilo.style.animation = ``;
                el_vinilo.style.animation = `rotate_disk_animation 2s linear infinite`;
            },2500);            
        }
        else if(el_vinilo.classList.contains("animation_second")){
            el_vinilo.classList.remove("animation_second");
            el_vinilo.classList.add("animation_first");
        }
        else if(el_vinilo.classList.contains("animation_third")){
            el_vinilo.classList.remove("animation_third");
            el_vinilo.classList.add("animation_second");
            el_vinilo.style.animation = ``;
            
            setTimeout(() =>{
                el_vinilo.classList.remove("vinilo_over_winko");
                el_vinilo.style.animation = `move_out_animation 2s linear forwards`;
            },400)
        }
    })
}





function play_o_pause() {
    if(current_track.paused){
        btn_play_pause.innerHTML = `<i class="fa-solid fa-pause" id="pause_btn"></i>`;
    }
    else{
        btn_play_pause.innerHTML = `<i class="fa-solid fa-play" id="play_btn"></i>`;
    }
    setTimeout(() =>{
        current_track.play();
    },2850)
    isPlaying = true;
}

function nextTrack() {
    if(track_index < music_List3.length - 1 && isRandom === false){
        track_index += 1;
        console.log("random_index es1_____" + track_index)
    }
    else if (track_index < music_List3.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random()* music_List3.length);
        
        track_index = random_index;
        console.log("random_index es2_____" + track_index)
    }
    else{
        track_index = 0;
        console.log("random_index es3_____" + track_index)
    }
    loadTrack(track_index);
    play_o_pause();
}
function previousTrack() {
    console.log(track_index)
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_List3.length -1;
    }
    loadTrack(track_index);
    play_o_pause();
}


function reset() {
    time_inicio_contando.textContent = "00:00"
    total_duration.textContent = "00:00"
    slide_progress_song.value = 0;
}

function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime * (100 / current_track.duration);
        slide_progress_song.value = seekPosition;
        
        let currentMinutes = Math.floor(current_track.currentTime / 60);
        let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(current_track.duration / 60);
        let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);
        
        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
        time_inicio_contando.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }




}
slide_progress_song.addEventListener("click", ()=>{
    let seekto = current_track.duration * (slide_progress_song.value / 100);
    current_track.currentTime = seekto;
})

// --------------------------------------------- hacer el evento click para cuando presione el botom random
btn_random_track.addEventListener("click", () =>{
    if(btn_random_track.classList.contains("random_activo")){
        btn_random_track.classList.remove("random_activo")
        isRandom = false;
    }
    else{
        btn_random_track.classList.add("random_activo")
        isRandom = true;
    }
})

// --------------------------------------------- hacer el evento click para cuando presione el botom play o pause
btn_play_pause.addEventListener("click", () =>{
    if(current_track.paused){
        current_track.play();
        isPlaying = true;
        btn_play_pause.innerHTML = `<i class="fa-solid fa-pause" id="pause_btn"></i>`;
    }
    else{
        current_track.pause();
        isPlaying = false;
        btn_play_pause.innerHTML = `<i class="fa-solid fa-play" id="play_btn"></i>`;
    }
})
btn_previus_song.addEventListener("click", () =>{
    previousTrack();
})
btn_next_song.addEventListener("click", () =>{
    nextTrack();
})



let array_no_repeat_name_artist = name_artist.filter(function (
  elemento,
  indice,
  arreglo
) {
  return arreglo.indexOf(elemento) === indice;
});



let container_musica = document.querySelector(".container_musica");
let creacionObjetos = [];
let creacionSubObjetos = [];



for (let i = 0; i< array_no_repeat_name_artist.length ; i++){
    creacionObjetos.push(`
            <div class="folder_music_item" id="musica_${i}">
				<div class="container_music_folderIMG">
					<img src="images/folder_close.png" class="img_general_folder img_open_folder">
					<img src="images/folder_open.png" class="img_general_folder img_close_folder">
				</div>
				<div class="container_name_artist"><h4>${array_no_repeat_name_artist[i]}</h4></div>
				<div class="container_music_arrowIMG">
					<i class="fa-solid fa-caret-right fa-rotate-180 img_open_arrow"></i>
					<i class="fa-solid fa-caret-right fa-rotate-90 img_close_arrow"></i>
				</div>
			</div>
            <ul class="all_music_container" id="musica_${i}"></ul>
            `
    )
    container_musica.innerHTML = creacionObjetos.join(" ");
}
  


let folder_music_item = document.querySelectorAll(".folder_music_item");
let all_music_container = document.querySelectorAll(".all_music_container");

folder_music_item.forEach ((el1,ind1) =>{
    var folder_music_item_1 = el1.children[1].innerText;

    for (let j = 0; j< name_and_song.length ; j++){

        if(folder_music_item_1 == name_artist[j]){
            all_music_container.forEach((elemento2,index2) =>{
                if(elemento2.id == el1.id){
                    elemento2.innerHTML += `<li class="music_items"><p>${name_song[j]}</p>
                    
                    <audio src="${music_List3[j]}" class="${name_song[j]}"></li>`;
                }
            })
        }
        else{}
    }
})


    
folder_music_item.forEach((el,ind) =>{
    el.addEventListener("click", (e) =>{

        all_music_container.forEach((elemento_deplegable,ind1) =>{

            if((elemento_deplegable.id === el.id) ){
                elemento_deplegable.style.display = `block`;
                el.children[0].children[0].style.display = `none`;
                el.children[0].children[1].style.display = `block`;
                
                el.children[2].children[0].style.display = `none`;
                el.children[2].children[1].style.display = `block`;
            }
            else{
                elemento_deplegable.style.display = `none`;
                
                folder_music_item.forEach((el2,ind) =>{
                    el2.children[0].children[0].style.display = `block`;
                    el2.children[0].children[1].style.display = `none`;
                    
                    el2.children[2].children[0].style.display = `block`;
                    el2.children[2].children[1].style.display = `none`;
                })
                el.children[0].children[0].style.display = `none`;
                el.children[0].children[1].style.display = `block`;
                
                el.children[2].children[0].style.display = `none`;
                el.children[2].children[1].style.display = `block`;  
            }
        })
    })
})

let cada_music_item = document.querySelectorAll(".music_items");

cada_music_item.forEach((music_element,music_index) =>{
    music_element.addEventListener("click", () =>{
        
        name_song.forEach((nameElemento,nameIndex) =>{

            if(music_element.children[1].className == nameElemento){
                let ponerPlay = music_element.children[1];
                track_index = nameIndex;
                loadTrack (track_index);
                play_o_pause();
            }
        })        
    })
})


    
const slide_current_volume = document.querySelector(".slide_current_volume");

function volumeChange(){
    slide_current_volume.addEventListener('change', () => {
        current_track.volume = slide_current_volume.value / 100;
        if(current_track.volume == 0) {
            current_track.muted = true;
        }
        else{
            current_track.muted = false;
        }
    })
}


// -----------------------------------------   buscador de la musica   ------------------------------------------

const container_name_artist = document.querySelectorAll(".container_name_artist");

document.addEventListener("keyup", e=>{
    // console.log(e.target.value);
    if (e.target.matches("#buscador")){
        if (e.key === "Escape"){
            e.target.value = "";
            folder_music_item.forEach((el2,ind) =>{
                el2.children[0].children[0].style.display = `block`;
                el2.children[0].children[1].style.display = `none`;
                
                el2.children[2].children[0].style.display = `block`;
                el2.children[2].children[1].style.display = `none`;
            })
            all_music_container.forEach((elemento_deplegable,ind1) =>{
                elemento_deplegable.style.display = `none`;
            })
        }
        container_name_artist.forEach(elemento =>{
            if(elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase())){
                elemento.parentNode.classList.remove("filtro_hide_names")
            }
            else{
                elemento.parentNode.classList.add("filtro_hide_names");
            }
        });
    }
    if (e.target.matches("#body_key")){
        folder_music_item.forEach((el2,ind) =>{
            el2.children[0].children[0].style.display = `block`;
            el2.children[0].children[1].style.display = `none`;
            
            el2.children[2].children[0].style.display = `block`;
            el2.children[2].children[1].style.display = `none`;
        })
        all_music_container.forEach((elemento_deplegable,ind1) =>{
            elemento_deplegable.style.display = `none`;
        })

    }
})





