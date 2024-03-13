"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveZeroes = exports.transformString = exports.ISBN10 = exports.displayCities = exports.addCity = exports.City = void 0;
class City {
    constructor(cityName, country, population) {
        this.cityName = cityName;
        this.country = country;
        this.population = population;
    }
}
exports.City = City;
let cities = getCities();
const addCity = (city, ctry, pop) => {
    const existing = cities.find(c => c.cityName === city);
    if (existing) {
        return;
    }
    cities.push(new City(city, ctry, pop));
    saveCities(cities);
    (0, exports.displayCities)();
};
exports.addCity = addCity;
function generateCityTable(cities) {
    let table = '<table border="1">';
    table += '<tr><th>City Name</th><th>Country</th><th>Population</th></tr>';
    cities.forEach(city => {
        table += `<tr><td>${city.cityName}</td><td>${city.country}</td><td>${city.population}</td></tr>`;
    });
    table += '</table>';
    return table;
}
const displayCities = () => {
    const citiesFromLocalStorage = getCities();
    const tableContainer = document.getElementById('cityList');
    if (tableContainer) {
        tableContainer.innerHTML = generateCityTable(citiesFromLocalStorage);
    }
    const search = document.getElementById("search");
    if (search) {
        search.addEventListener('input', () => {
            const searchTerm = search.value.toLowerCase();
            const filter = cities.filter(city => city.cityName.toLowerCase().includes(searchTerm) ||
                city.country.toLowerCase().includes(searchTerm));
            if (tableContainer) {
                tableContainer.innerHTML = generateCityTable(filter);
            }
        });
    }
};
exports.displayCities = displayCities;
function saveCities(city) {
    localStorage.setItem('city', JSON.stringify(city));
}
function getCities() {
    const citiesJSON = localStorage.getItem('city');
    if (citiesJSON) {
        return JSON.parse(citiesJSON);
    }
    return [];
}
(0, exports.displayCities)();
function isValidISBN10(input) {
    if (input.length !== 10) {
        return false;
    }
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        const dig = parseInt(input[i]);
        if (isNaN(dig)) {
            return false;
        }
        sum += dig * (i + 1);
    }
    const lastDig = input[9];
    const lastChar = lastDig === 'X' ? 10 : parseInt(lastDig);
    if (isNaN(lastChar)) {
        return false;
    }
    sum += lastChar * 10;
    if (sum % 11 === 0) {
        return true;
    }
    else {
        return false;
    }
}
const ISBN10 = (input) => {
    let result = isValidISBN10(input);
    console.log(result);
};
exports.ISBN10 = ISBN10;
const transformString = (input) => {
    let result = '';
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    for (let i = 0; i < input.length; i++) {
        let c = input.charAt(i);
        c = c.toLowerCase();
        if (c >= 'a' && c <= 'z') {
            c = String.fromCharCode(((c.charCodeAt(0) - 97 + 1) % 26) + 97);
        }
        if (vowels.includes(c.toUpperCase())) {
            c = c.toUpperCase();
        }
        result += c;
    }
    console.log(result);
};
exports.transformString = transformString;
const moveZeroes = (input) => {
    let nonZeroIndex = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== 0) {
            input[nonZeroIndex] = input[i];
            nonZeroIndex++;
        }
    }
    while (nonZeroIndex < input.length) {
        input[nonZeroIndex] = 0;
        nonZeroIndex++;
    }
    console.log(input);
};
exports.moveZeroes = moveZeroes;
const arr = [false, 1, 0, 1, 2, 0, 1, 3, 'a'];
(0, exports.moveZeroes)(arr);
