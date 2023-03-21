import { inquirerMenu, leerInput, listPlaces, pausa } from "./helpers/inquirer.js"
import { Searchs } from "./models/searchs.js";

const main = async() =>{
    
    const searchs = new Searchs()
    let opt


    do{
        opt = await inquirerMenu()
        
        switch (opt){
            case '1':
                //input place
                const place = await leerInput('Ciudad: ')

                //search and select place
                const places = await searchs.ciudad(place)
                const idPlace = await listPlaces(places)
                if(idPlace=== '0') continue
                const selectedPlace = places.find( e => e.id === idPlace)

                //Save in history
                searchs.addHistory(selectedPlace.name)

                //get weather information
                const weather = await searchs.weatherPlace(selectedPlace.lat, selectedPlace.lng)

                console.log('\nInformación de la ciudad\n'.green)
                console.log('Ciudad:', selectedPlace.name)
                console.log('Lat:', selectedPlace.lat)
                console.log('Lng:', selectedPlace.lng)
                console.log('Clima:', weather.desc)
                console.log('Temperatura:', weather.temp)
                console.log('Mínima:', weather.min)
                console.log('Máxima:', weather.max)

                break;
            case '2':
                searchs.capitalizeHistory.forEach((place, i) => {
                    const idx = `${ i + 1 }.`.green
                    console.log(`${ idx } ${ place }`)
                })
            break;
            case '3':
                console.log('salir')
            break;
        }

    await pausa()
    
} while (opt !== '0');
}


main()