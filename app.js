require('dotenv').config()

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
        placeSelected = places.find(l => l.id === idSelected)
        // weather
        // show results
        
        console.log("\nCity information\n");
        console.log('City:', placeSelected.name);
        console.log('Latitude:', placeSelected.latitude);
        console.log('Longitude:', placeSelected.longitude);
        console.log('Tempeture:',);
        console.log('Mín:',);
        console.log('Máx:', );
      break;
    
      case 2:
      console.log("opcion 2");

      break;

      case 3:

      break;
    }

    await pause();

  }while(option !== 3)
}

main()