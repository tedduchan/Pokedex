/* let URL = 'https://pokeapi.co/api/v2/pokemon?limit=200/'; */

const toggleElement = document.getElementById('toggle');
const allCardsElement = document.getElementById('allCards');
const pokeGridElement = document.getElementById('pokeGrid');
const pokeViewElement = document.getElementById('pokeView');
const pokeViewHeaderElement = document.getElementById('pokeViewHeader');

/* const changeTheme = () => {
	cardElement.classList.toggle('light');
}; */
const fetchData = async URL => {
	const response = await fetch(URL);
	const data = await response.json();
	return data;
};

/* const printData = async () => {
	const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=151/');

	// Crear un elemento de imagen y establecer su atributo src
	const imageElement = document.createElement('img');
	imageElement.src = data;
	imageElement.width = 150; // ajusta según tus necesidades
	imageElement.height = 150;

	/* // Limpiar el contenido existente del cardTitleElement
	cardTitleElement.innerHTML = ''; */

/* // Agregar la imagen al cardTitleElement
	cardTitleElement.appendChild(imageElement); */

/* // Puedes seguir usando cardTextElement para mostrar otros detalles del Pokémon
	cardTextElement.textContent = `Nombre: ${data}, Tipo: ${data}`; */

/* console.dir(data.results);
}; */

// printData();
const changePokeNumber = pokeNumber => {
	if (pokeNumber < 10) {
		return `#000${pokeNumber}`;
	} else if (pokeNumber < 100) {
		return `#00${pokeNumber}`;
	} else if (pokeNumber < 1000) {
		return `#0${pokeNumber}`;
	} else {
		return pokeNumber;
	}
};

const chargePkmn = async () => {
	const data = await fetchData('https://pokeapi.co/api/v2/pokemon?limit=9/');

	const fragment = document.createDocumentFragment();
	for (const pokemon of data.results) {
		const newDiv = document.createElement('div');
		newDiv.classList = 'card';
		newDiv.dataset.number = `0`;
		const newDivText = document.createElement('div');
		newDivText.classList = 'pkmnNumber';
		const pokeData = await fetchData(pokemon.url);
		newDivText.textContent = changePokeNumber(pokeData.id);
		newDiv.id = pokeData.id;
		const newDivBg = document.createElement('div');
		newDivBg.classList = 'cardBg';
		const newImageBg = document.createElement('img');
		newImageBg.src = '../assets/images/pkbll-bg.png';
		newDivBg.append(newImageBg);

		const newDivPkmn = document.createElement('div');
		newDivPkmn.classList = 'pkmnImage';
		const newImagePkmn = document.createElement('img');
		newImagePkmn.src = pokeData.sprites.front_default;
		newImagePkmn.loading = 'lazy';
		// newImagePkmn.src = `https://www.serebii.net/pokemongo/pokemon/${pokeNumber}.png`;
		// newImagePkmn.src = pokeData.sprites.other.home.front_default;

		newDivPkmn.append(newImagePkmn);
		const newDivName = document.createElement('div');
		newDivName.classList = 'cardText';
		newDivName.textContent = pokemon.name;

		newDiv.append(newDivText, newDivBg, newDivPkmn, newDivName);
		fragment.append(newDiv);

		allCardsElement.append(fragment);
	}
};

const openPokemon = async event => {
	console.log(event.target.closest('.card'));
	if (event.target.closest('.card') != null) {
		pokeGridElement.classList.add('hidden');
		pokeViewElement.classList.remove('hidden');
		const pokeURL = `https://pokeapi.co/api/v2/pokemon/${
			event.target.closest('.card').id
		}`;
		const pokeData = await fetchData(pokeURL);
		const newH2 = document.createElement('h2');
		newH2.textContent = pokeData.name;
		pokeViewHeaderElement.append(newH2);
		const newSpan = document.createElement('span');
		newSpan.textContent = changePokeNumber(pokeData.id);
		pokeViewHeaderElement.append(newSpan);
	}
};

chargePkmn();
allCardsElement.addEventListener('click', openPokemon);
/* buttonElement.addEventListener('click', printData); */
/* toggleElement.addEventListener('click', changeTheme); */
