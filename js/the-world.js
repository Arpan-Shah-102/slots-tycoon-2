const planetSelector = document.querySelector('.planet-select');
const refreshPlanetBtn = document.querySelector('.refresh-planets');
const autoRefreshLabel = document.querySelector('.auto-refresh-label');

let refreshTimer = 300;
refreshPlanetBtn.addEventListener('click', () => {
  if (getStardust() < 1) {
    delayAlert('You need ✺1 to refresh the planet options manually.', 150);
    playSound(baseSfx.denied);
  } else {
    if (confirm('Spend ✺1 to refresh the planet options manually?')) {
      calcStardust(-1);
      moneyLabel.textContent = formatMoney(getStardust(), 's');
      reloadPlanets();
    }
  }
});
setInterval(() => {
  refreshTimer--;
  autoRefreshLabel.textContent = `Auto Refresh in ${refreshTimer}s`;
  if (refreshTimer <= 0) {
    reloadPlanets();
  }
}, 1000);

function reloadPlanets() {
  refreshTimer = 300;
  setCurrentPlanetsForSale(generateNewPlanetsForSale());
  updatePlanetBids();
  for (let i = 0; i < 4; i++) {
    planetBids.buyButtons[i].disabled = false;
    planetBids.buyButtons[i].classList = 'planet-bid buy primary';
  }
}

const planetInfoPannel = {
  image: document.querySelector('.planet-icon'),
  nameLabel: document.querySelector('.planet-things .planet-name'),
  populationLabel: document.querySelector('.planet-things .planet-population'),
  resourcesLabel: document.querySelector('.planet-things .planet-resources'),
  atmosphereLabel: document.querySelector('.planet-things .planet-atmosphere'),
  stabilityLabel: document.querySelector('.planet-things .planet-stability'),
  efficiencyLabel: document.querySelector('.planet-things .planet-efficiency'),

  offers: {
    offer1: document.querySelector('.planet-things .buttons .planet-price-1'),
    offer2: document.querySelector('.planet-things .buttons .planet-price-2'),
    offer3: document.querySelector('.planet-things .buttons .planet-price-3'),
    offer4: document.querySelector('.planet-things .buttons .planet-price-4'),
  }
};
const planetBids = {
  name: document.querySelectorAll('.planet-bid.name'),
  icon: document.querySelectorAll('.planet-bid.planet-icon'),
  population: document.querySelectorAll('.planet-bid.population'),
  resources: document.querySelectorAll('.planet-bid.resources'),
  atmosphere: document.querySelectorAll('.planet-bid.atmosphere'),
  stability: document.querySelectorAll('.planet-bid.stability'),
  efficiency: document.querySelectorAll('.planet-bid.efficiency'),
  buyButtons: document.querySelectorAll('.planet-bid.buy')
}

function updatePlanetInfo(planetName) {
  if (planetName === 'none') {
    planetInfoPannel.image.classList = 'planet-icon planet-icon-empty';
    planetInfoPannel.nameLabel.textContent = 'No Planet Selected';
    planetInfoPannel.populationLabel.textContent = 'N/A';
    planetInfoPannel.resourcesLabel.textContent = 'N/A';
    planetInfoPannel.atmosphereLabel.textContent = 'N/A';
    planetInfoPannel.stabilityLabel.textContent = 'N/A';
    planetInfoPannel.efficiencyLabel.textContent = 'N/A';

    Object.values(planetInfoPannel.offers).forEach(offer => {
      offer.textContent = 'N/A';
      offer.disabled = true;
    });
    return;
  }
  const planetData = getPlanetsOwnedData()[planetName];
  if (planetData) {
    planetInfoPannel.image.classList = `planet-icon ${planetData['planetIconClass']}`;
    planetInfoPannel.nameLabel.textContent = planetData['name'];
    planetInfoPannel.populationLabel.textContent = planetData['population'].toLocaleString();
    planetInfoPannel.resourcesLabel.textContent = planetData['resources'].toLocaleString();
    planetInfoPannel.atmosphereLabel.textContent = planetData['atmosphere'];
    planetInfoPannel.stabilityLabel.textContent = planetData['stability'];
    planetInfoPannel.efficiencyLabel.textContent = `${planetData['efficiency']}%`;

    Object.values(planetInfoPannel.offers).forEach((offer, index) => {
      offer.textContent = `✺${planetData['offers'][index]}`;
      offer.disabled = false;
    });
  }
}
function updatePlanetBids() {
  for (let i = 0; i < 4; i++) {
    const planet = getCurrentPlanetsForSale()[i];
    planetBids.name[i].textContent = planet.name;
    planetBids.icon[i].classList = `planet-bid planet-icon ${planet.planetIconClass}`;
    planetBids.population[i].textContent = `Population: ${planet.population.toLocaleString()}`;
    planetBids.resources[i].textContent = `Resources: ${planet.resources.toLocaleString()}`;
    planetBids.atmosphere[i].textContent = `Atmosphere: ${planet.atmosphere}`;
    planetBids.stability[i].textContent = `Stability: ${planet.stability}`;
    planetBids.efficiency[i].textContent = `Efficiency: ${planet.efficiency}%`;

    if (getCurrentPlanetsForSale()[i].bought) {
      planetBids.buyButtons[i].disabled = true;
      planetBids.buyButtons[i].textContent = `Bought`;
      planetBids.buyButtons[i].classList = 'planet-bid buy green secondary';
    } else {
      planetBids.buyButtons[i].textContent = `Buy: ✺${planet.price}`;
    }
  }
}

planetBids.buyButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const price = getCurrentPlanetsForSale()[index]['price'];
    const planetName = getCurrentPlanetsForSale()[index]['name'];
    const planet = getCurrentPlanetsForSale()[index];

    if (getStardust() < price) {
      delayAlert(`You need ✺${price} to buy ${planetName}.`, 50);
      playSound(baseSfx.denied);
      return;
    }
    if (confirm(`Are you sure you want to buy ${planetName} for ✺${price}?`)) {
      calcStardust(-price);
      moneyLabel.textContent = formatMoney(getStardust(), 's');

      const newPlanetData = {
        name: planetName,
        population: planet.population,
        resources: planet.resources,
        atmosphere: planet.atmosphere,
        stability: planet.stability,
        efficiency: planet.efficiency,
        priceRange: planet.priceRange,
        planetIconClass: planet.planetIconClass,
        offers: [randomIntInRange(planet.priceRange), randomIntInRange(planet.priceRange), randomIntInRange(planet.priceRange), randomIntInRange(planet.priceRange)]
      }
      const planetsSaleData = getCurrentPlanetsForSale();
      planetsSaleData[index].bought = true;

      setCurrentPlanetsForSale(planetsSaleData);
      addPlanetOwned(newPlanetData);
      updateTheWorldThings();
      updatePlanetBids();
      button.disabled = true;
      delayAlert(`You have successfully bought ${planetName} for ✺${price}!`);
      playSound(baseSfx.win);
    }
  });
});

planetSelector.addEventListener('change', () => {
  const selectedPlanet = planetSelector.value;
  updatePlanetInfo(selectedPlanet);
});

function updateTheWorldThings() {
  // Update the planet selector options
  planetSelector.innerHTML = '';
  for (const planet in getPlanetsOwnedData()) {
    const option = document.createElement('option');
    option.value = planet;
    option.textContent = getPlanetsOwnedData()[planet]['name'];
    planetSelector.appendChild(option);
  }

  updatePlanetInfo(Object.keys(getPlanetsOwnedData()).length < 1 ? 'none' : planetSelector.value);
}
updateTheWorldThings();
updatePlanetBids();

Object.values(planetInfoPannel.offers).forEach((offer, index) => {
  offer.addEventListener('click', () => {
    const offerPrice = getPlanetsOwnedData()[planetSelector.value]['offers'][index];
    const planetName = getPlanetsOwnedData()[planetSelector.value]['name'];

    if (confirm(`Are you sure you want to sell ${planetName} for ✺${offerPrice}?`)) {
      removePlanetOwned(planetSelector.value);
      calcStardust(offerPrice);
      moneyLabel.textContent = formatMoney(getStardust(), 's');
      updateTheWorldThings();
      playSound(baseSfx.win);
      delayAlert(`You have successfully sold ${planetName} for ✺${offerPrice}!`);
    }
  });
});
