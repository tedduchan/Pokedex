import {
	allCardsElement,
	arrowElement,
	searchInputElement,
	selectGenElement,
	toggleElement
} from './dom';

import {
	busqueda,
	changeGeneration,
	changeTheme,
	chargePkmn,
	openPokemon,
	returnHome
} from './functions';

chargePkmn('https://pokeapi.co/api/v2/pokemon?limit=151/');
allCardsElement.addEventListener('click', openPokemon);
toggleElement.addEventListener('click', changeTheme);
arrowElement.addEventListener('click', returnHome);
selectGenElement.addEventListener('change', changeGeneration);
searchInputElement.addEventListener('keydown', function (event) {
	if (event.keyCode === 13) {
		if (searchInputElement.value === '') {
			changeGeneration();
		} else {
			busqueda(searchInputElement.value.toLowerCase());
		}
	}
});
