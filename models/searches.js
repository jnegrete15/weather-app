const axios = require('axios')


class Searches {

  history = ['hola'];

  constructor() {

  }

  get paramsMapBox(){
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit':5,
      'language':'en'
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


      return [];

    } catch (err) {

      return [];
    }

  }

}

module.exports = Searches