async function getApis() {
  const request = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0');
  const pokemons = await request.json();
  console.log(pokemons);

  for (var pokemon of pokemons.results) {
    var pokeData = await (await fetch(pokemon['url'])).json();

    var pokeImg = pokeData['sprites']['other']['official-artwork']['front_default'];
    var pokeId = pokeData['id'];
    var pokeName = pokemon['name'];
    var pokeType = pokeData['types'][0]['type']['name'];

    createCard(pokeImg, pokeId, pokeName, pokeType);
  }
}

function createCard(imgSrc, id, name, type) {
  var pokeRow = document.getElementById("poke-row");

  var col = document.createElement("div");
  col.className = "col-md-3";

  var card = document.createElement("div");
  card.className = "card";

  var img = document.createElement("img");
  img.src = imgSrc;
  img.className = "card-img-top";

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";

  var number = document.createElement("p");
  number.className = "card-text";
  number.textContent = "#" + id;

  var title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = name.charAt(0).toUpperCase() + name.slice(1);

  var typeSpan = document.createElement("span");
  typeSpan.className = "badge bg-primary";
  typeSpan.textContent = type.charAt(0).toUpperCase() + type.slice(1);

  cardBody.appendChild(number);
  cardBody.appendChild(title);
  cardBody.appendChild(typeSpan);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);
  pokeRow.appendChild(col);
}

function search() {
  var searchInput = document.getElementById("search-input").value.toLowerCase();
  var pokeRow = document.getElementById("poke-row");
  pokeRow.innerHTML = "";

  fetch('https://pokeapi.co/api/v2/pokemon/' + searchInput)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          var pokeImg = data['sprites']['other']['official-artwork']['front_default'];
          var pokeId = data['id'];
          var pokeName = data['name'];
          var pokeType = data['types'][0]['type']['name'];

          createCard(pokeImg, pokeId, pokeName, pokeType);
        });
      } else {
        alert('Pokémon não encontrado!');
      }
    })
    .catch((error) => {
      alert('Ocorreu um erro ao buscar o Pokémon!');
    });
}

getApis();
