/*
 * sets up map on page and retrieves json data
 *
 * @author: Jonathan Browning
*/

const FACTBOOK_URL = 'https://compsci290_2021spring.dukecs.io/resources/data/countries/factbook.json';

const mymap = L.map('map-id', { zoomControl: false }).setView([0, 0], 2);

L.tileLayer('images/tiles/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 2,
}).addTo(mymap);

let filteredData;

async function fetchJSON() {
    try {
        // "wait" for fetch to finish getting data
        const response = await fetch(FACTBOOK_URL);
        // "wait" for data to be converted from JSON string to JavaScript data structure
        const jsonData = await response.json();
        // console.log(jsonData);

        filteredData = Object.entries(jsonData.countries).filter((x) => isValidCountry(x[1].data));

        // console.log("hi");

        // filteredData.forEach((country) =>
        //     //console.log(getCoordinates(country))
        // );

        displayInternetUsers(0, 140000, 0, 100);
    } catch (error) {
        // if there is an error, report it
        console.error(error);
    }
}

function isValidCountry(country) {
    if (country.geography
        && country.geography.geographic_coordinates
        && country.geography.geographic_coordinates.latitude
        && country.geography.geographic_coordinates.latitude.degrees
        && country.geography.geographic_coordinates.longitude
        && country.geography.geographic_coordinates.longitude.degrees
        && country.communications
        && country.communications.internet
        && country.communications.internet.users
        && country.communications.internet.users.percent_of_population
        && country.people
        && country.people.population
        && country.people.population.total
        && country.economy
        && country.economy.gdp
        && country.economy.gdp.per_capita_purchasing_power_parity
        && country.economy.gdp.per_capita_purchasing_power_parity.annual_values
        && country.economy.gdp.per_capita_purchasing_power_parity.annual_values['0']
        && country.economy.gdp.per_capita_purchasing_power_parity.annual_values['0'].value) {
        return true;
    }
    return false;
}

fetchJSON();
