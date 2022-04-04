/*
 * Plotting data to show relationship between internet use and purchasing power parity per capita
 * @author: Jonathan Browning
 */

 
let indicators = [];

let defaultSettings = [0, 140000, 0, 100];



function resetPurchase(){
    clearIndicators();
    defaultSettings[0] = 0;
    defaultSettings[1] = 140000;
    displayInternetUsers(defaultSettings[0],defaultSettings[1],defaultSettings[2],defaultSettings[3]);
    document.getElementById("ppp-1").checked = false;
    document.getElementById("ppp-2").checked = false;
    document.getElementById("ppp-3").checked = false;
    document.getElementById("ppp-4").checked = false;
    document.getElementById("ppp-5").checked = false;
}

function resetInternet(){
    clearIndicators();
    defaultSettings[2] = 0;
    defaultSettings[3] = 100;
    displayInternetUsers(defaultSettings[0],defaultSettings[1],defaultSettings[2],defaultSettings[3]);
    document.getElementById("int-1").checked = false;
    document.getElementById("int-2").checked = false;
    document.getElementById("int-3").checked = false;
    document.getElementById("int-4").checked = false;
    document.getElementById("int-5").checked = false;
}

function resetAllFilters(){
    resetPurchase();
    resetInternet();
}

// https://stackoverflow.com/questions/8622336/jquery-get-value-of-selected-radio-button
function purchaseFilter(){
    //console.log("HHajsl;ka")
    

    //console.log(document.getElementById("ppp-1").checked);
    let p1 = document.getElementById("ppp-1").checked;
    let p2 = document.getElementById("ppp-2").checked;
    let p3 = document.getElementById("ppp-3").checked;
    let p4 = document.getElementById("ppp-4").checked;
    let p5 = document.getElementById("ppp-5").checked;
    
    if (p1){
        defaultSettings[1] = 15000;
    }
    if (p2){
        defaultSettings[0] = 15000;
        defaultSettings[1] = 30000;
    }
    if (p3){
        defaultSettings[0] = 30000;
        defaultSettings[1] = 50000;
    }
    if (p4) {
        defaultSettings[0] = 50000;
        defaultSettings[1] = 70000;
    }
    if (p5) {
        defaultSettings[0] = 70000;
        defaultSettings[1] = 140000;
    }

    let i1 = document.getElementById("int-1").checked;
    let i2 = document.getElementById("int-2").checked;
    let i3 = document.getElementById("int-3").checked;
    let i4 = document.getElementById("int-4").checked;
    let i5 = document.getElementById("int-5").checked;

    if (i1){
        defaultSettings[3] = 20;
    }
    if (i2){
        defaultSettings[2] = 20;
        defaultSettings[3] = 40;
    }
    if (i3){
        defaultSettings[2] = 40;
        defaultSettings[3] = 60;
    }
    if (i4) {
        defaultSettings[2] = 60;
        defaultSettings[3] = 80;
    }
    if (i5) {
        defaultSettings[2] = 80;
        defaultSettings[3] = 100;
    }

    clearIndicators();
    displayInternetUsers(defaultSettings[0], defaultSettings[1], defaultSettings[2], defaultSettings[3]);

}


function displayInternetUsers(lowerPPP, upperPPP, lowerInt, upperInt){
    filteredData.forEach((country) => {
        let internetUsers = country[1].data.communications.internet.users.percent_of_population;
        let pppc = country[1].data.economy.gdp.per_capita_purchasing_power_parity.annual_values["0"].value;
        //console.log(internetUsers);
        let colorNeeded;
        if (internetUsers < 20){
            colorNeeded = '#ff0000';
        }
        else if (internetUsers > 20 && internetUsers < 40){
            colorNeeded = '#ffa500';
        }
        else if (internetUsers > 40 && internetUsers < 60){
            colorNeeded = '#8f00ff';
        }
        else if (internetUsers > 60 && internetUsers < 80){
            colorNeeded = '#0000ff';
        }
        else{
            colorNeeded = '#00ff00';
        }
        
        if (pppc > lowerPPP && pppc < upperPPP && internetUsers > lowerInt && internetUsers < upperInt){
            let coords = getCoordinates(country);
            let circle = L.circle(coords, {
            color: colorNeeded,
            //fillColor: '#03f',
            fillOpacity: 0.3,
            radius: 2.5*pppc
            }).addTo(mymap);
        
            circle.bindTooltip(`Country: ${country[1].data.name}<br>Number of Internet Users per 100 people: ${internetUsers}
                <br>Per capita purchasing power parity: ${pppc}<br>Total population: ${country[1].data.people.population.total}`);
            indicators.push(circle);
        }
    });
}


function getCoordinates(country){ 
    //console.log(country.geography.location)
    let lat = country[1].data.geography.geographic_coordinates.latitude.degrees * (country[1].data.geography.geographic_coordinates.latitude.hemisphere === 'N' || -1),
        lon = country[1].data.geography.geographic_coordinates.longitude.degrees * (country[1].data.geography.geographic_coordinates.longitude.hemisphere === 'E' || -1);
    return [lat, lon];
}

function clearIndicators() {
    indicators.forEach((i) => i.remove());
    indicators = [];
  }