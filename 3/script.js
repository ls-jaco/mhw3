var favorites = [];

document.querySelector("#searchbar").addEventListener("keyup", search);


let grid = document.querySelector("#grid-album");

    album.forEach((element, index) => {
        element.titolo;
        element.immagine;
        element.descrizione;

        let albumBox = document.createElement("div");
        albumBox.className = 'albumBoxClass';
        albumBox.id = 'albumBoxID-' + index;

        let innerAlbumBox = document.createElement("div");
        innerAlbumBox.className = 'innerAlbumBoxClass';
        albumBox.appendChild(innerAlbumBox);

        
        let image = document.createElement("img");
        image.id = 'img' + index;
        image.addEventListener("click", function(){
            show_description(index)
        })
        image.src = ("./img/" + element.immagine);
        innerAlbumBox.appendChild(image);
    
        let title = document.createElement("h1");
        title.textContent = element.titolo;
        title.id = "albumTitle" + index;
        innerAlbumBox.appendChild(title);

        let favoriteButton = document.createElement("i");
        favoriteButton.className = "material-icons";
        favoriteButton.innerHTML = "&#xe87e;";
        favoriteButton.addEventListener("click", function() {
            add_favorite(element)
        })
        innerAlbumBox.appendChild(favoriteButton);
    
        let description = document.createElement("p");
        description.className = 'descriptionClass';
        description.id = "descrizione" + index;
        description.textContent = element.descrizione;
        albumBox.appendChild(description);

        let closeDesc = document.createElement("i");
        closeDesc.className = "material-icons-canc";
        closeDesc.innerHTML = "&#xe5c9;";
        closeDesc.addEventListener("click", function(){
        show_description(index);
        })
        description.appendChild(closeDesc);

        let spotify_div = document.createElement("div");
        spotify_div.className = "spotifyDivClass";
        spotify_div.id = "spotifyDivId-" + index;
        albumBox.appendChild(spotify_div);


        grid.appendChild(albumBox);
    });

function search(){

    let input = document.getElementById("searchbar");
    let filter = input.value.toUpperCase();
    let gridS = document.getElementById("grid-album");
    let albumsearch = gridS.getElementsByClassName("albumBoxClass");
    for (let index = 0; index < albumsearch.length; index++) {
        let h1 = albumsearch[index].getElementsByTagName("h1")[0];
        let result = h1.innerText;
        if (result.toUpperCase().indexOf(filter) > -1) {
          albumsearch[index].style.display = "";
        } else {
          albumsearch[index].style.display = "none";
          }   
    }
}

function show_description(id){
    let x = document.getElementById("descrizione" + id);
    if (x.style.display === ""){
        x.style.display = "block";
    }else{ 
        x.style.display = "";
        }
} 


function add_favorite(element){
    if (!favorites.includes(element)){
        favorites.push(element)
    }
    updateFavorites()
}

function updateFavorites(){

    let grid = document.getElementById('favorites').querySelector('.favorites__grid');
    grid.innerHTML = '';

    favorites.forEach( (element, index) => {
        element.titolo;
        element.immagine;

        let albumBox = document.createElement("div");
        albumBox.classList.add(['favorites__grid-album','favorite']);
        albumBox.id = 'albumBoxID-' + index;
        albumBox.className = "albumBoxFavorite";
        
        let image = document.createElement("img");
        image.id = 'img' + index;
        image.src = ("./img/" + element.immagine);
        albumBox.appendChild(image);
        let removeFavoriteButton = document.createElement("i");
        removeFavoriteButton.className ="fas fa-heart-broken";
        removeFavoriteButton.addEventListener("click", function(){
            remove_favorite(index);
        })
        albumBox.appendChild(removeFavoriteButton);
    
        let title = document.createElement("h1");
        title.textContent = element.titolo;
        albumBox.appendChild(title);

        grid.appendChild(albumBox);
    });
}


function remove_favorite(index) {
    favorites.splice(index, 1);
    updateFavorites();
}

function showMenu() {
    let x = document.getElementById("mobile__links");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


  function searchAPI(event)
  {
    // Impedisci il submit del form
    event.preventDefault();

    // Leggi valore del campo di testo
    const album_input = document.querySelector('#album');
    const album_value = encodeURIComponent(album_input.value);
    rest_url = 'http://ws.audioscrobbler.com/2.0/?method=album.search&album=' + album_value + '&api_key=' + api_key + '&format=json';
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse1).then(onJson1);
  }


function onJson1(json) {

    console.log('JSON ricevuto');

    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    
    // Leggi il numero di risultati
    const results = json.results.albummatches.album
    let num_results = results.length;
    // Mostriamone al massimo 5
    if(num_results > 5)
      num_results = 5;
    for(let i=0; i<num_results; i++)
    
    {
      // Leggi il documento e le informazioni
      const album_data = results[i]
      const title = album_data.name;
      const images = album_data.image;
      let selected_image = null;
      for(image of images)
      {
        if(image.size == 'large')
          selected_image = image['#text'];
      }

      // Creiamo il div che conterrà immagine e didascalia
      const album = document.createElement('div');
      album.classList.add('album');
      const img = document.createElement('img');
      img.src = selected_image;
      const caption = document.createElement('p');
      caption.textContent = title;
      album.appendChild(img);
      album.appendChild(caption);
      library.appendChild(album);
    }
  }
  
  function onResponse1(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }


  function show_api(id){
    let x = document.getElementById("div_api");
    let y = document.getElementById("showsearch");
    if (x.style.display === ""){
        x.style.display = "block";
        y.style.display = "none";
    }else{ 
        x.style.display = "";
        y.style.display = "block";
        }
} 
  // API key --- METODO NON SICURO!
  const api_key = 'a48553ca5408fc2c14ae058f742c2e0c';

  const form = document.querySelector('form');
  form.addEventListener('submit', searchAPI);



  function onResponse(response) {
    return response.json();
  }

  function onTokenJson(json)
  {
    // Imposta il token global
    token = json.access_token;
  }

  function onTokenResponse(response)
  {    
    return response.json();
  }

  // OAuth credentials --- NON SICURO!
  const client_id = 'a3d490c5fd084afe820e482860e3c59e';
  const client_secret = '1bee37a7a4f3468f9e0c1f18ec16ad27';

  // Dichiara variabile token
  let token;

  // All'apertura della pagina, richiediamo il token
  fetch("https://accounts.spotify.com/api/token",
    {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }

    }
  ).then(onTokenResponse).then(onTokenJson).then(searchItemFromSpotify);


function searchItemFromSpotify(){

  album.forEach((element, indiceProva) => {

    let copiaTitolo = element.titolo;

    let titoloEncoded = encodeURI(copiaTitolo);
    titoloEncoded = titoloEncoded.toLowerCase();

    console.log(titoloEncoded);

    let urlAlbum = "https://api.spotify.com/v1/search?q=" + titoloEncoded + "&type=album&market=IT&limit=1"

    console.log(urlAlbum)
      fetch(urlAlbum,
      {
      headers:
        {
        'Authorization' : 'Bearer ' + token
        }
      }
      ).then(response => onResponse(response))
       .then(data => searchAlbumFromSpotify(data, indiceProva));
  });
}



function searchAlbumFromSpotify(json, indiceProva){

  console.log(json)
  let resultSearch = json.albums.items[0].id;
  console.log(resultSearch);
//esegui la richiesta
fetch("https://api.spotify.com/v1/albums/" + resultSearch + "/tracks?market=IT",
{
  headers:
  {
    'Authorization' : 'Bearer ' + token
  }
}
  ).then(response => onResponse(response))
   .then(data => onJson(data, indiceProva));
}


let indice = 0;
  
function onJson(json, indiceProva) {
  console.log(indiceProva)
  let results = json.items;

  const musicDiv = document.querySelector("#spotifyDivId-" + indiceProva);
  indice ++;
  results.forEach((element) => {


    let track_div = document.createElement("div");
    track_div.className = "track_div_class";

    let titolo_brano = document.createElement("h1");
    titolo_brano.textContent = element.name;
    track_div.appendChild(titolo_brano);

    let sound = document.createElement('audio');
    if(element.preview_url!= null){
    sound.id = 'audio-player';
    sound.controls = 'controls';
    sound.src = element.preview_url
    track_div.appendChild(sound);
    } else {
      let notFound = document.createElement("p");
      notFound.textContent = "The following preview is not avaible :(";
      track_div.appendChild(notFound);
    }

    musicDiv.appendChild(track_div);
  });
}