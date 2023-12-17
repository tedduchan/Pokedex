/* let URL = 'https://pokeapi.co/api/v2/pokemon?limit=100/'; */

const toggleElement = document.getElementById('toggle');
const allCardsElement = document.getElementById('allCards');
const pokeGridElement = document.getElementById('pokeGrid');
const pokeViewElement = document.getElementById('pokeView');
const pokeViewHeaderElement = document.getElementById('pokeViewHeader');
const pokeballBgElement = document.querySelector('.bg-image');
const infoContainerElement = document.querySelector('.info-container');
const miniPkbllElement = document.querySelector('.header img');
const arrowElement = document.querySelector('.arrow-back');
const selectGenElement = document.getElementById('selectGen');
const generationNameElement = document.getElementById('generationName');
const pokeImageLoaderElement = document.getElementById('pokeImageLoader');
const searchInputElement = document.querySelector('.search-input');
const typeArray = [
	0,
	'normal',
	'fighting',
	'flying',
	'poison',
	'ground',
	'rock',
	'bug',
	'ghost',
	'steel',
	'fire',
	'water',
	'grass',
	'electric',
	'psychic',
	'ice',
	'dragon',
	'dark',
	'fairy'
];

const changeTheme = () => {
	document.body.classList.toggle('light');
	pokeballBgElement.classList.toggle('light');
	infoContainerElement.classList.toggle('light');
	miniPkbllElement.classList.toggle('light');
	arrowElement.classList.toggle('light');
};

const fetchData = async URL => {
	const response = await fetch(URL);
	const data = await response.json();
	return data;
};

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

const chargePkmn = async URL => {
	const data = await fetchData(URL);
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
		newImg.onload = function () {
			console.log('CARGADA');
			pokeImageLoaderElement.classList.remove('block');
			pokeImageLoaderElement.classList.add('none');
		};
		newDiv = document.createElement('div');
		newDiv.classList.add('type');

		for (const pokeType of pokeData.types) {
			newImg = document.createElement('img');
			newImg.src = `../assets/images/${pokeType.type.name}.svg`;
			newImg.alt = pokeType.type.name;
			newDiv.append(newImg);
		}
		pokeViewElement.append(newDiv);

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
		infoContainerElement.append(newDivDescription);
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
		infoContainerElement.append(newDivInfo);
		const newDivCharacteristics = document.createElement('div');
		newDivCharacteristics.classList = 'flexRow';
		let newDivColumn = document.createElement('div');
		newDivColumn.classList = 'flexColumn';
		const newSpanWeight = document.createElement('span');
		newSpanWeight.classList = 'inline-flex';
		const newImgWeight = document.createElement('img');
		newImgWeight.src = '../assets/images/weight.svg';
		const pokePeso = pokeData.weight / 10;
		newSpanWeight.textContent = `${pokePeso}kg`;
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
		const pokeAltura = pokeData.height / 10;
		newSpanHeight.textContent = `${pokeAltura}m`;
		const newSpanAltura = document.createElement('span');
		newSpanAltura.classList.add('centered');
		newSpanAltura.textContent = 'Altura';
		newSpanHeight.append(newImgHeight);
		newDivColumn.append(newSpanHeight, newSpanAltura);
		newDivCharacteristics.append(newDivColumn);
		infoContainerElement.append(newDivCharacteristics);
		const newSpanEvolution = document.createElement('span');
		newSpanEvolution.textContent = 'Evolución';
		newSpanEvolution.classList.add('marg-left20');
		infoContainerElement.append(newSpanEvolution);
		const newDivAllMinisContainer = document.createElement('div');
		newDivAllMinisContainer.classList.add('minisContainer');

		const pokemonEvolutionData = await fetchData(
			pokemonSpeciesData.evolution_chain.url
		);

		console.dir(pokemonEvolutionData);

		let pokemonEvolutionChain = pokemonEvolutionData.chain;
		do {
			let pokemonEvolutionDetails = await fetchData(
				pokemonEvolutionChain.species.url
			);
			pokemonEvolutionDetails = await fetchData(
				`https://pokeapi.co/api/v2/pokemon/${pokemonEvolutionDetails.id}`
			);
			// hacer un fetch de la url y guardarlo en un let y luego poner la imagen y el textcontent
			const newDivPokeMiniContainer = document.createElement('div');
			newDivPokeMiniContainer.classList.add('pokeMini');
			const newImgMiniPkmn = document.createElement('img');
			newImgMiniPkmn.src = pokemonEvolutionDetails.sprites.front_default;
			newDivPokeMiniContainer.append(newImgMiniPkmn);
			const newSpanTextMini = document.createElement('span');
			newSpanTextMini.classList.add('textMini');
			newSpanTextMini.textContent = pokemonEvolutionDetails.name;
			newDivPokeMiniContainer.append(newSpanTextMini);
			newDivAllMinisContainer.append(newDivPokeMiniContainer);

			console.log(pokemonEvolutionChain.species.name);

			if (pokemonEvolutionChain.evolves_to.length === 0) {
				break;
			}

			pokemonEvolutionChain = pokemonEvolutionChain.evolves_to[0];
		} while (true);
		infoContainerElement.append(newDivAllMinisContainer);
		const newSpanStats = document.createElement('span');
		newSpanStats.textContent = 'Puntos de base';
		newSpanStats.classList.add('marg-left20');
		infoContainerElement.append(newSpanStats);
		const newDivPokeStatsContainer = document.createElement('div');
		newDivPokeStatsContainer.classList.add('statsStyle');
		newDivPokeStatsContainer.id = 'statsContainer';

		const statsArray = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'];

		for (let index = 0; index <= 5; index++) {
			const newDivStatsDetails = document.createElement('div');
			const newSpanStatName = document.createElement('span');
			newSpanStatName.classList.add('max');
			newSpanStatName.textContent = statsArray[index];
			newDivStatsDetails.append(newSpanStatName);
			const newSpanStatNumber = document.createElement('span');
			newSpanStatNumber.textContent = pokeData.stats[index].base_stat;
			newSpanStatNumber.classList.add('max');
			newDivStatsDetails.append(newSpanStatNumber);
			const newSpanStatsBar = document.createElement('span');
			newSpanStatsBar.id = `prog-bar${index}`;

			newDivStatsDetails.append(newSpanStatsBar);
			newDivPokeStatsContainer.append(newDivStatsDetails);
			infoContainerElement.append(newDivPokeStatsContainer);
		}

		for (let index = 0; index <= 5; index++) {
			const newSpanStatsBarElement = document.getElementById(
				`prog-bar${index}`
			);
			console.log(newSpanStatsBarElement);
			const newSpanStatsBarStyle = newSpanStatsBarElement.style;
			newSpanStatsBarStyle.setProperty(
				'width',
				`${pokeData.stats[index].base_stat}px`
			);
		}

		const newSpanWeek = document.createElement('span');
		newSpanWeek.textContent = 'Debilidades';
		newSpanWeek.classList.add('marg-left20');
		infoContainerElement.append(newSpanWeek);

		const newDivStatsContainer = document.createElement('span');
		newDivStatsContainer.classList.add('weeknesStyle');
		newDivStatsContainer.id = 'statsContainer';
		const newDivAttack = document.createElement('div');
		newDivAttack.classList.add('attack');
		const pokeTypeData1 = await fetchData(
			`https://pokeapi.co/api/v2/type/${pokeData.types[0].type.name}`
		);
		let pokeTypeData2 = null;
		if (pokeData.types.length > 1) {
			pokeTypeData2 = await fetchData(
				`https://pokeapi.co/api/v2/type/${pokeData.types[1].type.name}`
			);
		}

		for (let index = 1; index < 19; index++) {
			const newDivContainerAttack = document.createElement('div');
			newDivContainerAttack.classList.add('flex-reverse');
			const newSpanMulti = document.createElement('span');
			let multiplicador = 1;

			if (
				pokeTypeData1.damage_relations.double_damage_from.some(
					tipo => tipo.name === typeArray[index]
				)
			) {
				multiplicador = 2;
			}
			if (
				pokeTypeData1.damage_relations.half_damage_from.some(
					tipo => tipo.name === typeArray[index]
				)
			) {
				multiplicador = 0.5;
			}
			if (
				pokeTypeData1.damage_relations.no_damage_from.some(
					tipo => tipo.name === typeArray[index]
				)
			) {
				multiplicador = 0;
			}
			if (pokeTypeData2 !== null) {
				if (
					pokeTypeData2.damage_relations.double_damage_from.some(
						tipo => tipo.name === typeArray[index]
					)
				) {
					multiplicador = multiplicador * 2;
				}
				if (
					pokeTypeData2.damage_relations.half_damage_from.some(
						tipo => tipo.name === typeArray[index]
					)
				) {
					multiplicador = multiplicador / 2;
				}
				if (
					pokeTypeData2.damage_relations.no_damage_from.some(
						tipo => tipo.name === typeArray[index]
					)
				) {
					multiplicador = multiplicador * 0;
				}
			}

			newSpanMulti.textContent = `x${multiplicador}`;
			if (multiplicador > 1) {
				newSpanMulti.classList.add('green');
			} else if (multiplicador < 1) {
				newSpanMulti.classList.add('red');
			}
			newDivContainerAttack.append(newSpanMulti);
			const newImageContainer = document.createElement('span');
			newImageContainer.classList.add('weekness');
			const newImageType = document.createElement('img');
			newImageType.src = `../assets/images/${typeArray[index]}.svg`;
			newImageContainer.append(newImageType);
			newDivContainerAttack.append(newImageContainer);
			newDivAttack.append(newDivContainerAttack);
		}

		newDivStatsContainer.append(newDivAttack);

		infoContainerElement.append(newDivStatsContainer);

		const buttonShiny = document.getElementById('screamButton');
		buttonShiny.addEventListener('click', () => toggleShiny(pokeData));

		pokeViewElement.append(infoContainerElement);
	}
};

const returnHome = () => {
	pokeImageLoaderElement.classList.remove('none');
	pokeImageLoaderElement.classList.add('block');

	const h2Element = pokeViewHeaderElement.querySelector('h2');
	if (h2Element) {
		pokeViewHeaderElement.removeChild(h2Element);
	}

	// Obtén el span dentro de pokeViewHeader y elimínalo
	const spanElement = pokeViewHeaderElement.querySelector('span');
	if (spanElement) {
		pokeViewHeaderElement.removeChild(spanElement);
	}

	const pokemonContainerElement =
		pokeViewElement.querySelector('.pkmn-container');
	if (pokemonContainerElement) {
		pokeViewElement.removeChild(pokemonContainerElement);
	}

	const typeContainerElement = pokeViewElement.querySelector('.type');
	if (typeContainerElement) {
		pokeViewElement.removeChild(typeContainerElement);
	}

	infoContainerElement.innerHTML = '';
	pokeViewElement.classList.add('hidden');
	pokeGridElement.classList.remove('hidden');
};

const changeGeneration = () => {
	allCardsElement.innerHTML = '';
	generationNameElement.textContent = selectGenElement.value;
	if (selectGenElement.value === 'Generación 1 (Kanto)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=151/');
	} else if (selectGenElement.value === 'Generación 2 (Johto)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151');
	} else if (selectGenElement.value === 'Generación 3 (Hoenn)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251');
	} else if (selectGenElement.value === 'Generación 4 (Sinnoh)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=107&offset=386');
	} else if (selectGenElement.value === 'Generación 5 (Teselia)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=156&offset=493');
	} else if (selectGenElement.value === 'Generación 6 (Kalos)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=72&offset=649');
	} else if (selectGenElement.value === 'Generación 7 (Alola)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=88&offset=721');
	} else if (selectGenElement.value === 'Generación 8 (Galar)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=96&offset=809');
	} else if (selectGenElement.value === 'Generación 9 (Paldea)') {
		chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=105&offset=905');
	}
};

const busqueda = async palabraBuqueda => {
	const allPokemon = await fetchData(
		`https://pokeapi.co/api/v2/pokemon?limit=1010`
	);
	console.log(palabraBuqueda);
	const pokeIndex = allPokemon.results.findIndex(
		pokemon => pokemon.name === palabraBuqueda
	);
	if (pokeIndex !== -1) {
		allCardsElement.innerHTML = '';
		chargePkmn(`https://pokeapi.co/api/v2/pokemon?limit=1&offset=${pokeIndex}`);
	}
};

chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=151/');
allCardsElement.addEventListener('click', openPokemon);
toggleElement.addEventListener('click', changeTheme);
arrowElement.addEventListener('click', returnHome);
selectGenElement.addEventListener('change', changeGeneration);
searchInputElement.addEventListener('keydown', function (event) {
	// Verifica si la tecla presionada es la tecla "Enter" (código 13)
	if (event.keyCode === 13) {
		// Llama a la función cuando se presiona "Enter"
		if (searchInputElement.value === '') {
			changeGeneration();
		} else {
			busqueda(searchInputElement.value.toLowerCase());
		}
	}
});
