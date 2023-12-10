const URL = 'https://pokeapi.co/api/v2/pokemon/';

const toggleElement = document.getElementById('toggle');
const AllCardsElement = document.getElementById('AllCards');
const cardTitleElement = document.getElementById('card-title');
const cardTextElement = document.getElementById('card-text');
const buttonElement = document.getElementById('button');

/* const changeTheme = () => {
	cardElement.classList.toggle('light');
}; */
const fetchData = async () => {
	const response = await fetch(URL);
	const data = await response.json();
	return data;
};

const printData = async () => {
	const data = await fetchData();

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

	console.dir(data);
};

printData();

const chargePkmn = () => {
	const fragment = document.createDocumentFragment();
	for (let index = 1; index < 151; index++) {
		const newDiv = document.createElement('div');
		newDiv.classList = 'card';
		newDiv.dataset.number = `${index}`;
		const newDivText = document.createElement('div');
		newDivText.classList = 'pkmnNumber';
		if (index < 10) {
			newDivText.textContent = `#00${index}`;
		} else if (index < 100) {
			newDivText.textContent = `#0${index}`;
		} else {
			newDivText.textContent = `#${index}`;
		}
		const newDivBg = document.createElement('div');
		newDivBg.classList = 'cardBg';
		const newImageBg = document.createElement('img');
		newImageBg.src = '../assets/images/pkbll-bg.png';
		newDivBg.append(newImageBg);

		const newDivPkmn = document.createElement('div');
		newDivPkmn.classList = 'pkmnImage';
		const newImagePkmn = document.createElement('img');
		newImagePkmn.src = '../assets/images/Bulbasaur.png';
		newDivPkmn.append(newImagePkmn);
		const newDivName = document.createElement('div');
		newDivName.classList = 'cardText';
		newDivName.textContent = 'Bulbasaur';

		newDiv.append(newDivText, newDivBg, newDivPkmn, newDivName);
		fragment.append(newDiv);
	}
	AllCardsElement.append(fragment);
};

chargePkmn();

/* buttonElement.addEventListener('click', printData); */
/* toggleElement.addEventListener('click', changeTheme); */
