const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeMoves = document.querySelector('[data-poke-moves]');

const TypeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    default: '#2A1A1F',
}

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
       .then(data => data.json())
       .then(response => renderPokemonData(response))
       .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types, moves } = data;
    
    pokeName.textContent = data.name;
    pokeImg .setAttribute('src', sprite);
    pokeId.textContent = `N° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonMoves(moves);
}

const setCardColor = types => {
    const ColorOne = TypeColors[types[0].type.name];
    const ColorTwo = types[1] ? TypeColors[types[1].type.name] : TypeColors.default;
    pokeImg.style.background = `radial-gradient(${ColorTwo} 33%, ${ColorOne} 33%`;
    pokeImg.style.backgroundSize = ' 5px 5px';

}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = TypeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statTextElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statTextElement.appendChild(statElementName);
        statTextElement.appendChild(statElementAmount);
        pokeStats.appendChild(statTextElement);
    });
}
const renderPokemonMoves = moves =>  {
    pokeMoves.innerHTML = '';
    moves.forEach(move => {
        const moveTextElement = document.createElement("div");
        moveTextElement.textContent = move.move.name;
        pokeMoves.appendChild(moveTextElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'Pokemon no encontrado';
    pokeImg.setAttribute('src', 'imagenes poke\poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}
