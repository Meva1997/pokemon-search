const searchInput = document.querySelector('#search-input'); 
const searchBtn = document.querySelector('#search-button'); 
const container2 = document.querySelector('.container-2')
const container3 = document.querySelectorAll('.stat'); 
const containerImg = document.querySelector('.container-img');
const typesContainer = document.querySelector('#types'); 
const clearBtn = document.querySelector('#clear-btn')

clearBtn.addEventListener('click', () => {
  cleanContainer(); 
  limpiarImg(); 
  container3.forEach(element => {
    element.textContent = ''; 
  });  
  
})
 
searchBtn.addEventListener('click', validar); 

const typeColors = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
  unknown: '#68A090', // Tipo desconocido
  shadow: '#000000' // Tipo sombra (usado en algunas ediciones)
};


let url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"; 

const fetchData = async(pokemon) => {
  try{
    const res = await fetch(`${url}/${pokemon}`); 
    //si no recibe la info de la API
      if(!res.ok){
        throw new Error('Pokemon not found')
      }
    const data = await res.json()

    displayPokemon(data)

  } catch(error){
    alert(error.message)
  }
}

function validar(){
  const searchValue = searchInput.value.trim().toLowerCase(); 

  if(searchValue === ''){
    alert('Please insert a pokemon name or ID')
    return; 
  }

  fetchData(searchValue); 
  searchInput.value = ''; 
} 

function displayPokemon(pokemon){
  
  limpiarImg(); 

  const {name, id, sprites, weight, height, stats,types} = pokemon

  const pokemonName = document.querySelector('#pokemon-name')
  pokemonName.textContent = `${name.toUpperCase()}`; 

  const pokemonID = document.querySelector('#pokemon-id');
  pokemonID.textContent = `#${id}`;

  const weightP = document.querySelector('#weight'); 
  weightP.textContent = `Weight: ${weight}`; 

  const heightP = document.querySelector('#height'); 
  heightP.textContent = `Height: ${height}`;  

  const img = document.createElement('img'); 
  img.id = "sprite"; 
  img.classList.add('sprite-img'); 
  img.src = `${sprites.front_default}`;
  img.alt = `${name}`

  containerImg.appendChild(img); 

  //pokemon type 
 
  typesContainer.innerHTML = ''; 


  types.forEach((type) => {
    const typeDiv = document.createElement('div'); // Crear un nuevo <div> para cada tipo
    typeDiv.classList.add('type-div'); // Asegurarse de que tenga una clase
    typeDiv.style.backgroundColor = typeColors[type.type.name]; // Asignar el color de fondo basado en el tipo
    typeDiv.textContent = `${type.type.name.toUpperCase()}`; // Asignar el nombre del tipo
    typesContainer.appendChild(typeDiv); // Agregar el div al contenedor
  }); 
   

  // Asignar los valores de los stats a las celdas correspondientes en el HTML
  document.querySelector('#hp').textContent = stats[0].base_stat; // Hp
  document.querySelector('#attack').textContent = stats[1].base_stat; // Attack
  document.querySelector('#defense').textContent = stats[2].base_stat; // Defense
  document.querySelector('#special-attack').textContent = stats[3].base_stat; // Sp. Attack
  document.querySelector('#special-defense').textContent = stats[4].base_stat; // Sp. Defense
  document.querySelector('#speed').textContent = stats[5].base_stat; // Speed

}
   
const limpiarImg  = () => {
  while(containerImg.firstChild){
    containerImg.removeChild(containerImg.firstChild)
  }
}

function cleanContainer(){ 
  document.querySelector('#pokemon-name').textContent = '';  
  document.querySelector('#pokemon-id').textContent = '';  
  document.querySelector('#weight').textContent = '';  
  document.querySelector('#height').textContent = '';  
  typesContainer.textContent = ''; 
}