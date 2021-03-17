require('dotenv').config()
require('colors')

const { pause, inquirerMenu, readInput, listPlaces } = require('./helpers/inquirer')
const Searches = require('./models/searches')

const main = async() =>{
  
  const searches = new Searches();
  let option;

  do {
    option = await inquirerMenu();

    switch (option) {
      case 1:
        
        // show message
        const place = await readInput('City: ')

        // search places
        const places = await searches.city(place);
        
        // Select the place
        const idSelected = await listPlaces(places);
        if(idSelected == '0') continue;

        placeSelected = places.find(l => l.id === idSelected)

        searches.addHistorial(placeSelected.name)

        // weather
        weather = await searches.getWeather(placeSelected.latitude, placeSelected.longitude);

        // show results
        console.clear();
        console.log("\nCity information\n");
        console.log('City:', placeSelected.name.green);
        console.log('Latitude:', placeSelected.latitude);
        console.log('Longitude:', placeSelected.longitude);
        console.log('Tempeture:', searches.formatTempeture(weather.temp));
        console.log('Mín:',searches.formatTempeture(weather.temp_min));
        console.log('Máx:', searches.formatTempeture(weather.temp_max));
        console.log('Description:', weather.description.cyan);
      break;
    
      case 2:
        searches.history.forEach( (place, id) => {
          const idx = `${id + 1}.`.green;
          console.log(`${idx} ${place}`);
        })
      break;
    }

    await pause();

  }while(option !== 3)
}

main()