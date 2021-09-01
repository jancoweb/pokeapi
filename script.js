const form = document.getElementById('form')
const search = document.getElementById('search')
const API_URL = 'https://pokeapi.co/api/v2'

async function searchPokemon(term){
  const res = await fetch(`${API_URL}/pokemon/${term}`);
  const data = await res.json();
  document.getElementById('card-container').innerHTML='';
  showPokemon(data);
  showPokemonStats(data);
  getColorbyType(data);
  more(data);
  getHeight(data);
  getWeight(data);
}

function showPokemon(data){

  const card = document.createElement('div');
  card.classList.add('card');
  const container = document.getElementById('card-container');
  container.appendChild(card)

  card.innerHTML = `
    <img src="${data.sprites.other.dream_world.front_default}" alt="" id="poke_img">
    <h2 id="poke_name">${data.name}</h2> `
}

function showPokemonStats(data){
   
  const stats = document.createElement('div');
  stats.classList.add('stats');
  statsContainer = document.getElementById('card-container')
  statsContainer.appendChild(stats);

  stats.innerHTML = `
    <h3 id="statsHead">Infos:</h3>
    <p>Type: </p>
    <h5 id="type_span">${data.types[0].type.name}</h5>
    <p>Weight: </p>
    <h5 id="weight_span"></h5>
    <p>Height: </p>
    <h5 id="height_span"></h5>
    <p>Poke ID: </p>
    <h5>${data.id}</h5>
  `
}

function getColorbyType(data){
  let poketype = `${data.types[0].type.name}`
  const allTypes = 'water eletric grass rock fairy poison flying ice steel normal fighting ghost psychic ground fire';
  result = allTypes.match(poketype);

  if(result[0] === data.types[0].type.name){
    const typeBg = document.getElementById('poke_name');
    const boxshadow = document.getElementById('poke_img');
    boxshadow.classList.add(`${result[0]}`)
    typeBg.classList.add(`${result[0]}`);    
  }
}

function getWeight(data){
  const weight = data.weight;
  const weightRes = parseFloat(weight)/10;
  document.getElementById('weight_span').innerHTML = `${weightRes} kg`
}

function getHeight(data){
  const height = data.height;
  const heightRes = parseFloat(height)/10;
  document.getElementById('height_span').innerHTML = `${heightRes} m`
}

function more(data){
  const more = document.getElementById('nav');
  
  more.innerHTML = `<a href='https://www.pokemon.com/br/pokedex/${data.name}' target="_blank">
  <img src="img/pokemon-logo.png" alt=""></a>` 
 }

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const searchTerm = search.value;
  if(!searchTerm){
    alert('Something is wrong')
  } else {
    searchPokemon(searchTerm)
  }
})