let nameH1;
let populationSpan;
let terrainSpan;
let climateSpan;
let surfaceWaterSpan;
let diameterSpan;
let rotationPeriodSpan;
let gravitySpan;
let orbitalPeriodSpan;
let filmsDiv;
let charactersDiv;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener("DOMContentLoaded", () => {
  nameH1 = document.querySelector("h1#name");
  populationSpan = document.querySelector("span#population");
  terrainSpan = document.querySelector("span#terrain");
  climateSpan = document.querySelector("span#climate");
  surfaceWaterSpan = document.querySelector("span#surface_water");
  diameterSpan = document.querySelector("span#diameter");
  rotationPeriodSpan = document.querySelector("span#rotation_period");
  gravitySpan = document.querySelector("span#gravity");
  orbitalPeriodSpan = document.querySelector("span#orbital_period");
  charactersUl = document.querySelector("#characters>ul");
  filmsUl = document.querySelector("#films>ul");
  const sp = new URLSearchParams(window.location.search);
  const id = sp.get("id");
  getPlanet(id);
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id);
    console.log(JSON.stringify(planet));
    planet.characters = await fetchCharacters(planet);
    planet.films = await fetchFilms(planet);
  } catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}
async function fetchPlanet(id) {
  let characterUrl = `${baseUrl}/planets/${id}`;
  return await fetch(characterUrl).then((res) => res.json());
}

async function fetchCharacters(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url).then((res) => res.json());
  console.log("CHARACTERS: ", JSON.stringify(characters));
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${planet?.id}/films`;
  const films = await fetch(url).then((res) => res.json());
  console.log("FILMS: ", JSON.stringify(films));
  return films;
}

const renderPlanet = (planet) => {
  document.title = `SWAPI - ${planet?.name}`; // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;
  populationSpan.textContent = planet?.population;
  terrainSpan.textContent = planet?.terrain;
  climateSpan.textContent = planet?.climate;
  surfaceWaterSpan.textContent = planet?.surface_water;
  diameterSpan.textContent = planet?.diameter;
  rotationPeriodSpan.textContent = planet?.rotation_period;
  gravitySpan.textContent = planet?.gravity;
  orbitalPeriodSpan.textContent = planet?.orbital_period;
  const CharactersLis = planet?.characters?.map(
    (character) =>
      `<li><a href="/character.html?id=${character.id}">${character.name}</li>`
  );
  charactersUl.innerHTML = CharactersLis.join("");
  const filmsLis = planet?.films?.map(
    (film) => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`
  );
  filmsUl.innerHTML = filmsLis.join("");
};
