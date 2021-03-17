const fs = require('fs')

const axios = require('axios')
require('colors')


class Searches {

  history = [];
  dbPath = './db/database.json'

  constructor() {
    this.readDB()

  }

  get paramsMapBox(){
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit':5,
      'language':'en'
    }
  }

  get paramsOpenWeather(){
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'lang': 'en',
      'units': 'metric'
    }
  }

  async city( place = ''){

    try {
      const instance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox
      });
      
      const resp = await instance.get()
      
      return resp.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        longitude: place.center[0],
        latitude: place.center[1]
      }))


    } catch (err) {

      return [];
    }

  }

  async getWeather(lat, lon){
    try {
      const inst = axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather`,
        params: {...this.paramsOpenWeather, lat, lon}
      })

      const info = await inst.get()
      return {
        description: info.data.weather[0].description,
        temp: info.data.main.temp,
        temp_min: info.data.main.temp_min,
        temp_max: info.data.main.temp_max
      }
    } catch (err) {
      console.log(err);
    }
  }

  addHistorial(place = ''){
    if(this.history.includes(place)){
      return;
    }
    this.history.unshift(place);



    //save to db
    this.saveDB();
  }

  saveDB(){
    const payload = {
      history: this.history
    }
    this.history = this.history.splice(0,4);

    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB(){
    if(!fs.existsSync(this.dbPath)){
      return null;
    }
    const info = fs.readFileSync(this.dbPath, {encoding:'utf-8'})
    const data = JSON.parse(info);

    this.history = data.history
  }

  formatTempeture(temp){
    if(temp<10){
      return `${temp}°`.blue
    }else{
      return `${temp}°`.red
    }
  }


}

module.exports = Searches