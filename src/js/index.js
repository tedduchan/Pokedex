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

const toggleShiny = pokeData => {
	const pokeImageElement = document.getElementById('pokeImage');
	const buttonShiny = document.getElementById('screamButton');
	if (pokeImageElement.src.includes('shiny')) {
		pokeImageElement.src =
			pokeData.sprites.other['official-artwork'].front_default;
		buttonShiny.textContent = 'Ver shiny';
	} else {
		pokeImageElement.src =
			pokeData.sprites.other['official-artwork'].front_shiny;
		buttonShiny.textContent = 'Ver normal';
	}
};

const openPokemon = async event => {
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
		let newDiv = document.createElement('div');
		newDiv.classList.add('pkmn-container');
		let newImg = document.createElement('img');
		newImg.id = 'pokeImage';
		newImg.classList.add('image-size');
		newImg.src = pokeData.sprites.other['official-artwork'].front_default;
		newDiv.append(newImg);
		pokeViewElement.append(newDiv);
		newDiv = document.createElement('div');
		newDiv.classList.add('type');

		for (const pokeType of pokeData.types) {
			newImg = document.createElement('img');
			newImg.src = `../assets/images/${pokeType.type.name}.svg`;
			newImg.alt = pokeType.type.name;
			newDiv.append(newImg);
		}
		pokeViewElement.append(newDiv);
		const newDivContainer = document.createElement('div');
		newDivContainer.classList.add('info-container');
		const newDivDescription = document.createElement('div');
		newDivDescription.classList.add('description');
		const newSpanDesc = document.createElement('span');
		newSpanDesc.classList.add('marg-left20');
		newSpanDesc.textContent = 'Descripción';
		newDivDescription.append(newSpanDesc);
		const newDivShiny = document.createElement('div');
		newDivShiny.id = 'screamButton';
		newDivShiny.classList.add('marg-left80', 'rounded');
		newDivShiny.textContent = 'Ver shiny';
		newDivDescription.append(newDivShiny);
		newDivContainer.append(newDivDescription);
		const newDivInfo = document.createElement('div');
		newDivInfo.classList.add('text');
		newDivInfo.id = 'pokeInfo';
		const pokemonSpeciesData = await fetchData(
			`https://pokeapi.co/api/v2/pokemon-species/${pokeData.name}`
		);
		const descriptionEntries = pokemonSpeciesData.flavor_text_entries;
		const spainDescription = descriptionEntries.find(
			pokeDescription => pokeDescription.language.name === 'es'
		);
		newDivInfo.textContent = spainDescription.flavor_text;
		newDivContainer.append(newDivInfo);
		const newDivCharacteristics = document.createElement('div');
		newDivCharacteristics.classList = 'flexRow';
		let newDivColumn = document.createElement('div');
		newDivColumn.classList = 'flexColumn';
		const newSpanWeight = document.createElement('span');
		newSpanWeight.classList = 'inline-flex';
		const newImgWeight = document.createElement('img');
		newImgWeight.src = '../assets/images/weight.svg';
		newSpanWeight.textContent = `${pokeData.weight}kg`;
		const newSpanPeso = document.createElement('span');
		newSpanPeso.classList.add('centered');
		newSpanWeight.append(newImgWeight);
		newSpanPeso.textContent = 'Peso';
		newDivColumn.append(newSpanWeight, newSpanPeso);
		newDivCharacteristics.append(newDivColumn);

		newDivColumn = document.createElement('div');
		newDivColumn.classList = 'flexColumn';
		const newSpanHeight = document.createElement('span');
		newSpanHeight.classList = 'inline-flex';
		const newImgHeight = document.createElement('img');
		newImgHeight.src = '../assets/images/height.svg';
		newSpanHeight.textContent = `${pokeData.height}m`;
		const newSpanAltura = document.createElement('span');
		newSpanAltura.classList.add('centered');
		newSpanAltura.textContent = 'Altura';
		newSpanHeight.append(newImgHeight);
		newDivColumn.append(newSpanHeight, newSpanAltura);
		newDivCharacteristics.append(newDivColumn);
		newDivContainer.append(newDivCharacteristics);

		pokeViewElement.append(newDivContainer);

		const buttonShiny = document.getElementById('screamButton');
		buttonShiny.addEventListener('click', () => toggleShiny(pokeData));
	}
};

chargePkmn();
allCardsElement.addEventListener('click', openPokemon);
/* buttonElement.addEventListener('click', printData); */
/* toggleElement.addEventListener('click', changeTheme); */
