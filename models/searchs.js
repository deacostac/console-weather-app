import fs, { readFileSync } from 'fs'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

class Searchs {
    history = []
    dbPath = './db/database.json'

    constructor(){
        this.readHistoryDB()
    }

    get capitalizeHistory(){
        return this.history.map( place => {
            let words = place.split(' ')
            words = words.map( w => w[0].toUpperCase() + w.substring(1))

            return words.join(' ')
        })
    }

    async ciudad(place){

        try{
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: {
                    'proximity': 'ip',
                    'language': 'es',
                    'limit': '5',
                    'access_token': process.env.MAPBOX_KEY
                }
            })
            const resp = await instance.get()
            
            return resp.data.features.map( place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        }catch{
            console.log('FAlla')
            return [];
        }
    }

    async weatherPlace(lat, lng){

        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    'lat': lat,
                    'lon': lng,
                    'units': 'metric',
                    'lang': 'es',
                    'appid': process.env.OPENWEATHER_KEY
                }
            })
            const resp = await instance.get()
    
            return {
                desc: resp.data.weather[0].description !== undefined
                ? resp.data.weather[0].description : 'Sin información',
                min: resp.data.main.temp_min,
                max: resp.data.main.temp_max,
                temp: resp.data.main.temp
            }
        }catch(error){
            console.log(error)
            return [];
        }
    }

    addHistory(place){

        //validate duplicates places
        if(this.history.includes(place.toLocaleLowerCase())){
            return
        }
        this.history.unshift( place.toLocaleLowerCase() )

        //save in db
        this.saveHistoryDB()


    }

    saveHistoryDB(){

        const payload = {
            history: this.history
        }

        fs.writeFileSync( this.dbPath, JSON.stringify(payload))
    }

    readHistoryDB(){

        if( !fs.existsSync( this.dbPath )) return

        const info = readFileSync( this.dbPath, {encoding: 'utf-8'})
        const data = JSON.parse( info )

        this.history = data.history



    }



}

export {
    Searchs
}