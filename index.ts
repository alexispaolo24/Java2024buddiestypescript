 interface CityInterface{
    cityName: string
    country: string
    population: number
}

export class City implements CityInterface{
    cityName: string;
    country: string;
    population: number;
    constructor(cityName:string,country:string,population:number){
        this.cityName = cityName
        this.country = country
        this.population = population
    }

}

let cities:City[] = getCities()

export const addCity = (city:string, ctry:string, pop:number) => {
    const existing = cities.find(c => c.cityName === city)
    if(existing){
        return
    }
    cities.push(new City(city,ctry,pop))
    saveCities(cities)
    displayCities()    
}

function generateCityTable(cities: City[]): string {
    let table = '<table border="1">'
    table += '<tr><th>City Name</th><th>Country</th><th>Population</th></tr>'
    cities.forEach(city =>{
        table += `<tr><td>${city.cityName}</td><td>${city.country}</td><td>${city.population}</td></tr>`
    })
    table += '</table>'
    return table
}

export const displayCities = () => {
    const citiesFromLocalStorage = getCities()
    const tableContainer = document.getElementById('cityList')
    if (tableContainer){
        tableContainer.innerHTML = generateCityTable(citiesFromLocalStorage)
    }
    const search = document.getElementById("search") as HTMLInputElement
    if(search){
        search.addEventListener('input', () =>{
            const searchTerm = search.value.toLowerCase()
            const filter = cities.filter(city=>
                city.cityName.toLowerCase().includes(searchTerm) ||
                city.country.toLowerCase().includes(searchTerm)
            )
            if(tableContainer){
                tableContainer.innerHTML = generateCityTable(filter)
            }
        })
    }
}

function saveCities(city:City[]){
    localStorage.setItem('city', JSON.stringify(city))
}

function getCities(): City[]{
    const citiesJSON = localStorage.getItem('city')
    if(citiesJSON){
        return JSON.parse(citiesJSON) as City[]
    }
    return []
}
displayCities()


function isValidISBN10(input:string){
    if (input.length !== 10){
        return false
    }
    let sum:number = 0
    for(let i=0;i<9;i++){
        const dig = parseInt(input[i])
        if(isNaN(dig)){
            return false
        }
        sum += dig*(i+1)
    }
    const lastDig = input[9]
    const lastChar = lastDig === 'X' ? 10:parseInt(lastDig)
    if(isNaN(lastChar)){
        return false
    }
    sum += lastChar*10;

    if(sum%11 === 0){
        return true
    } else{
        return false
    }
}

export const ISBN10 = (input: string) => {
    let result:boolean = isValidISBN10(input)
    console.log(result)
}

export const transformString = (input:string) =>{
    let result:string = ''
    const vowels = ['A','E','I','O','U']
    for (let i = 0; i <input.length; i++){
        let c = input.charAt(i)

        c = c.toLowerCase()

        if(c >= 'a' && c <= 'z'){
            c = String.fromCharCode(((c.charCodeAt(0)-97+1)%26)+97) 
        }
        if(vowels.includes(c.toUpperCase())){
            c = c.toUpperCase()
        }
        result += c
    }
    console.log(result)
}

export const moveZeroes = (input:any[]) => {
    let nonZeroIndex = 0
    for(let i=0;i<input.length;i++){
        if(input[i] !== 0){
            input[nonZeroIndex] = input[i]
            nonZeroIndex++
        }
    } 
    while (nonZeroIndex<input.length){
        input[nonZeroIndex] = 0;
        nonZeroIndex++
    }
    console.log(input)
}

const arr = [false, 1, 0, 1, 2, 0, 1, 3, 'a']

moveZeroes(arr)